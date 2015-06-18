/**
 * Created by jack on 5/25/15.
 */
/**
 * Created by jack on 14-11-18.
 * main Controller used by Terminal app
 */
Ext.define('checkScheduling.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'Main',

            'RoomNum'
        ],
        requires: [

            'Ext.Toolbar',
            'Ext.field.Text',
            'Ext.data.Store',
            'Ext.dataview.List'
        ],
        models: [

            'RoomNum'


        ],
        stores: [

            'RoomNums'

        ],
        control: {
            nav: {
                initialize: 'initRender'

            },
            settingbtn:{
                tap:'showSettingForm'
            }

        },
        refs: {

            nav: 'main',
            roomnum:'roomnum',
            tippanel:'main #tip',
            settingbtn:'main #settingbtn'

        }
    },



    installroom:function(){
        this.installapk(localStorage.serverurl+"app/room.apk");
    },
    installapk:function(url){

        Ext.Viewport.mask({ xtype: 'loadmask',
            message: "下载中..." });

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,gotFS , function(){});
        function gotFS(fileSystem) {

            fileSystem.root.getFile("check.apk", {create: true, exclusive: false}, gotFileEntry,  function(){

            });

            function gotFileEntry(fileEntry) {


                var fileTransfer = new FileTransfer();
                var uri = encodeURI(url);

                fileTransfer.download(
                    uri,
                    fileEntry.toInternalURL(),
                    function(entry) {
                        //console.log("download complete: " + entry.fullPath);
                        Ext.Viewport.unmask();
                        //Ext.Msg.alert("succ",entry.fullPath);
                        cordova.plugins.fileOpener2.open(
                            fileEntry.toInternalURL(),
                            'application/vnd.android.package-archive'
                        );

                        navigator.app.exitApp();




                    },
                    function(error) {
                        Ext.Msg.alert("失败","程序下载失败"+error.code);
                        Ext.Viewport.unmask();
                        //Ext.Msg.alert("失败","程序下载失败");

                    },
                    false,
                    {
                        headers: {
                            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                        }
                    }
                );




            }

        }

    },

    showSettingForm:function(item){
        var me=this;
        var overlay = Ext.Viewport.add({
            xtype: 'panel',
            // We give it a left and top property to make it floating by default
            left: 0,
            top: 0,

            // Make it modal so you can click the mask to hide the overlay
            modal: true,
            hideOnMaskTap: true,

            // Make it hidden by default
            hidden: true,

            // Set the width and height of the panel
            width: 350,
            height: 200,

            // Here we specify the #id of the element we created in `index.html`
            //contentEl: 'content',

            // Style the content and make it scrollable
            styleHtmlContent: true,
            scrollable: true,
            layout:'fit',

            // Insert a title docked at the top with a title
            items: [
                {
                    //docked: 'top',
                    xtype: 'formpanel',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'serverurl',
                            value:localStorage.serverurl,
                            label: 'serverurl'
                        },
                        {
                            xtype: 'textfield',
                            name: 'roomno',
                            hidden:false,
                            value:localStorage.roomno,
                            label: 'roomno'
                        },
                        {
                            xtype: 'textfield',
                            name: 'roomname',
                            hidden:false,
                            value:localStorage.roomname,
                            label: 'roomname'
                        },
                        {
                            xtype: 'button',
                            margin:15,
                            width:'90%',

                            text: '确定',
                            ui:'confirm',
                            handler:function(btn){
                                var form=btn.up('formpanel');
                                var formdata=form.getValues();
                                localStorage.serverurl=formdata.serverurl;
                                localStorage.roomno=formdata.roomno;
                                localStorage.roomname=formdata.roomname;
                                overlay.hide();
                                window.location.reload();

                            },
                            itemId: 'save'
                        },
                        {
                            xtype: 'button',
                            margin:15,
                            width:'90%',

                            text: '更新',
                            ui:'confirm',
                            handler:function(btn){
                                me.installroom();

                            }
                        }
                    ],
                    title: 'Overlay Title'
                }
            ]
        });

        overlay.showBy(item);


    },
    websocketInit:function(){
        testobj=this;

        var url=localStorage.serverurl;
        var roomno=localStorage.roomno;
        if(!url||url==""){
            Ext.Msg.alert('提示','服务地址为空');
            return ;
        }
        if(!roomno||roomno==""){
            Ext.Msg.alert('提示','房间号为空');
            return ;
        }
        //url=url?"ws://"+url.split("://")[1].split(":")[0]+":3001/":"ws://localhost:3001/";
        url=url.replace(/(:\d+)/g,":3001");
        url=url.replace("http","ws");
        this.socket = new WebSocket(url);
        var me=this;


        this.socket.onmessage = function(event) {
            var data=JSON.parse(event.data);
            if(data.type==2){
                if(localStorage.roomno==data.roomno){
                    var content=data.content;
                    var str='<div class="box3"><div class="border3">'+content+'</div></div>';
                    me.getTippanel().setHtml(str);

                }

            }else if(data.type==0){

                if(localStorage.roomno==data.roomno){
                    me.getRoomData();
                }

            }


        };
        this.socket.onclose = function(event) {

            //console.log(121212);
            var d = new Ext.util.DelayedTask(function(){
                me.websocketInit();
            });
            d.delay(5000);
        };

        this.socket.onopen = function() {

           me.socket.send(JSON.stringify({
                type:"smallscreen",
                content: '121'
            }));
        };

    },



    getRoomData:function(){

        var me=this;
        var store=this.getRoomnum().getStore();

        var successFunc = function (response, action) {
            var res=JSON.parse(response.responseText);
            store.setData(res);

        };
        var failFunc = function (response, action) {
            Ext.Msg.alert('获取数据失败', '服务器连接异常，请稍后再试', Ext.emptyFn);

        };
        var url = "getroomdata";
        var params = {
            roomno:localStorage.roomno
        };
        CommonUtil.ajaxSend(params, url, successFunc, failFunc, 'GET');

    },


    initRender: function () {



        //navigator.speech.startSpeaking( "社保卡", {voice_name: 'xiaoyan'} );
        this.websocketInit();
        this.getRoomData();




    }

});