Ext.define('checkScheduling.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        layout:'hbox',

        fullscreen: true,


        items: [
            {
                flex:1,

                padding:10,
                layout:'fit',
                //style: 'border-style:solid;',
                style: 'background-color: #759E60;',
                xtype:'panel',
                items:[
                    {
                        xtype : 'toolbar',
                        docked: 'top',
                        title: '房间病人等候',
                        items:[
                            {
                                xtype:'button',
                                docked: 'right',
                                itemId:'settingbtn',
                                iconCls:'settings'
                            }
                        ]
                    },

                    {
                        xtype:'roomnum'

                    }

                ]

            },
            {
                flex:1,
                padding:10,
                itemId:'tip',
                items:{
                xtype : 'toolbar',
                docked: 'top',
                title: '房间广播',

                },

                //style: 'background-color:;',
                html:'<div class="box3"><div class="border3">温馨提示：（暂无内容）</div></div>'
            }
        ]
    }
});
