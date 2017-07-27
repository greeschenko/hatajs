let inbox = new Hata('#col1', 'tmpls/main', [{
        name: 'test1',
    }, {
        name: 'test2',
    }],
    function() {
        let self = this;
        self.el.children().each(function(index) {
            let el = $(this);
            el.find('.delbtn').bind('click', function() {
                self.data.splice(el.index(), 1);
                self.render();
            });
            el.find('.nowbtn').bind('click', function() {
                now.data.push({
                    name: self.data[el.index()].name
                });
                self.data.splice(el.index(), 1);
                self.render();
                now.render();
            });
            el.find('.laterbtn').bind('click', function() {
                later.data.push({
                    name: self.data[el.index()].name
                });
                self.data.splice(el.index(), 1);
                self.render();
                later.render();
            });
        });
    }
).render();

let now = new Hata(
    '#col2',
    'tmpls/main', [],
    function() {
        let self = this;
        self.el.children().each(function(index) {
            let el = $(this);
            el.find('.delbtn').bind('click', function() {
                self.data.splice(el.index(), 1);
                self.render();
            });
            el.find('.nowbtn').remove();
            el.find('.laterbtn').bind('click', function() {
                later.data.push({
                    name: self.data[el.index()].name
                });
                self.data.splice(el.index(), 1);
                self.render();
                later.render();
            });
        });
    }
).render();

let later = new Hata(
    '#col3',
    'tmpls/main', [],
    function() {
        let self = this;
        self.el.children().each(function(index) {
            let el = $(this);
            el.find('.delbtn').bind('click', function() {
                self.data.splice(el.index(), 1);
                self.render();
            });
            el.find('.nowbtn').bind('click', function() {
                now.data.push({
                    name: self.data[el.index()].name
                });
                self.data.splice(el.index(), 1);
                self.render();
                now.render();
            });
            el.find('.laterbtn').remove();
        });
    }
).render();

$('#submit').bind('click', function() {
    inbox.data.push({
        name: $('#input').val(),
    });
    $('#input').val('');
    inbox.render();
});

let test = new Hata(
    '#res',
    //'tmpls/test',
    `
    <h2>{{test1}}</h2>
    `, {},
    function() {
        let self = this;
        self.el.bind('click', function() {
            console.log(4444);
            self.dataurl = '/data/test_new.json';
            self.rerender();
        });
    },
    '/data/test.json'
    //1000
).render();


let testuseelts = new Hata(
    '#testres',
    //'tmpls/test',
    `
    <div class="test_item">{{test}}<div class="list"></div></div>
    `, [{
        "test": 1111
    }, {
        "test": "dlsfdlsjf"
    }],
    function() {
        this.el.find('.list').each(function(index) {
            new Hata(
                $(this),
                //'tmpls/test',
                `
                <div class="list_item" style="padding-left:1em;">{{test}}</div>
                `, [{
                    "test": 1111
                }, {
                    "test": "dlsfdlsjf"
                }]
            ).render();
        });
    }
).render();
