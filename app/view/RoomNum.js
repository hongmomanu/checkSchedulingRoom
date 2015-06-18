Ext.define('checkScheduling.view.RoomNum', {
    extend: 'Ext.List',
    xtype:'roomnum',
    requires: [

    ],

    config: {
        store: 'RoomNums',
        itemId:'roomnum',
        emptyText: '<div>无相关内容</div>',
        //cls:'columnlist5',
        itemTpl: [
            '<div class="',
            '<tpl if="stateflag==\'ca\'">',
            'flash',
            '<tpl else>',
            'noflash',
            '</tpl>',
            '" >',
            '<div class="description" style="padding:5px;display: inline-block;text-align: center;vertical-align: middle;">',
            '<tpl if="sicktype==\'z\'">',
            '住院',
            '<tpl else>',
            '门诊',
            '</tpl>',
            '</div>',
            '<div class="description" style="padding:4px;display: inline-block;text-align: center;vertical-align: middle;">' +
            '{showno}' +
            '</div>',
            '<div class="description" style="padding:4px;display: inline-block;text-align: center;vertical-align: middle;">{patname}</div><br>',

            '<div class="description" style="padding:5px;display: inline-block;text-align: center;vertical-align: middle;">',
            '<tpl if="stateflag==\'ca\'">',
            '正在检查中',
            '<tpl else>',
            '请在门口等候',
            '</tpl>',
            '</div>',
            '</div>'

        ].join("")
    }
});