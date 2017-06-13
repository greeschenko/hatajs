class Hata {
    constructor(res, dom, data, events, dataurl, interval) {
        this.res = res;
        this.dom = dom;
        this.data = data;
        this.el = $(this.res);
        if (events == undefined) {
            events = function() {
                return false;
            }
        }
        this.events = events;
        this.dataurl = dataurl;
        this.interval = interval;
        this.init();
    }
    init() {
        let self = this;
        self.loadTmpl();
        self.loadData();
        if (self.interval != undefined) {
            setInterval(function() {
                self.loadData();
                self.render();
            }, self.interval);
        }
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
        self.getData('/' + self.dom + '.html', function(xmlhttp) {
            self.dom = xmlhttp.responseText;
            self.render();
        });
    }
    loadData() {
        let self = this;
        if (this.dataurl != undefined) {
            self.getData(this.dataurl, function(xmlhttp) {
                self.data = JSON.parse(xmlhttp.responseText);
                self.render();
            });
        }
    }
    getData(url, handler) {
        let self = this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    handler(xmlhttp);
                }
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}
