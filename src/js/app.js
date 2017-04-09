let inbox = new Hata('#col1', 'tmpls/main');
inbox.data = [{
    name: 'test1',
}, {
    name: 'test2',
}];
inbox.events = function() {
    inbox.el.children().each(function(index) {
        let el = $(this);
        el.find('.delbtn').bind('click', function() {
            inbox.data.splice(el.index(), 1);
            inbox.render();
        });
        el.find('.nowbtn').bind('click', function() {
            now.data.push({
                name: inbox.data[el.index()].name
            });
            inbox.data.splice(el.index(), 1);
            inbox.render();
            now.render();
        });
        el.find('.laterbtn').bind('click', function() {
            later.data.push({
                name: inbox.data[el.index()].name
            });
            inbox.data.splice(el.index(), 1);
            inbox.render();
            later.render();
        });
    });
};
inbox.render();


let now = new Hata('#col2', 'tmpls/main');
now.events = function() {
    now.el.children().each(function(index) {
        let el = $(this);
        el.find('.delbtn').bind('click', function() {
            now.data.splice(el.index(), 1);
            now.render();
        });
        el.find('.nowbtn').remove();
        el.find('.laterbtn').bind('click', function() {
            later.data.push({
                name: now.data[el.index()].name
            });
            now.data.splice(el.index(), 1);
            now.render();
            later.render();
        });
    });
};
now.render();


let later = new Hata('#col3', 'tmpls/main');
later.events = function() {
    later.el.children().each(function(index) {
        let el = $(this);
        el.find('.delbtn').bind('click', function() {
            later.data.splice(el.index(), 1);
            later.render();
        });
        el.find('.nowbtn').bind('click', function() {
            now.data.push({
                name: later.data[el.index()].name
            });
            later.data.splice(el.index(), 1);
            later.render();
            now.render();
        });
        el.find('.laterbtn').remove();
    });
};
later.render();

$('#submit').bind('click', function() {
    inbox.data.push({
        name: $('#input').val(),
    });
    $('#input').val('');
    inbox.render();
});
