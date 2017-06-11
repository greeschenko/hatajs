class Hata {
    constructor(res, dom, data = [], events) {
        this.res = res;
        this.dom = dom;
        this.data = data;
        this.el = $(this.res);
        this.events = events;
        this.init();
    }
    init() {
        this.loadTmpl();
    }
    render() {
        let self = this;

        if (Array.isArray(self.data)) {
            self.el.html('');
            for (let one in self.data) {
                let one = self.data[one];
                self.el.append(self.setData(one, self.dom));
            }
        } else {
            self.el.html(self.setData(self.data, self.dom));
        }
        self.events();
        return self;
    }
    change(newdata) {
        this.data = newdata;
        this.render();
    }
    setData(obj, html) {
        for (var i in obj) {
            html = html.replace(new RegExp('{{' + i + '}}', 'g'), obj[i]);
        }
        return html;
    }
    loadTmpl() {
        let self = this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    self.dom = xmlhttp.responseText;
                }
            }
        };

        xmlhttp.open("GET", '/' + self.dom + '.html', false);
        xmlhttp.send();
    }
}
