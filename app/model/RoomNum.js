Ext.define('checkScheduling.model.RoomNum', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            '_id',
            'name',
            'sortno',
            'sortcode',
            'stateflag',
            'sicktype',
            'patname',
            'linenos',
            'roomno',
            'showno'

        ]
    }
});
