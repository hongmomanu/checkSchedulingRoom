Ext.define('checkScheduling.store.RoomNums', {
    extend: 'Ext.data.Store',
    config: {
        model: 'checkScheduling.model.RoomNum',
        autoLoad: true,
        sorters: 'stateflag',
        /*grouper: {
            groupFn: function(record) {
                return record.get('userinfo').sectionname;
            }
        },*/

    }
});
