module.exports = {

    getDateFromTimestamt: function(time){
        let date;
        if(typeof time === 'object'){
            date = time;
        }else{
            date = new Date(Number(time));
        }
        
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        return (day + '.' + month + '.' + date.getFullYear());
    }
}