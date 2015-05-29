Ext.define('checkScheduling.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        layout:'vbox',

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

                //style: 'background-color:;',
                html:'<div><marquee  scrollamount=2>温馨提示：（暂无内容）</marquee></div>'
            }
        ]
    }
});
