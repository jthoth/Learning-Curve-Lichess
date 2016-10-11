'use strict';
var app = app || {};


(function () {

    var DropDownCategory = {
      controller: function () {
        var ctrl = this
        ctrl.data = m.prop([{ name: 'Bullet', id: 'bullet'},{name: 'Blitz', id: 'blitz'},{name: 'Classical', id: 'classical'},{name: 'Crazyhouse', id: 'crazyhouse'}])
        ctrl.selectedId = m.prop()
      },
      view: function (ctrl) {
        return m('select.subscribe-card__field#input_pref', { onchange: m.withAttr('value', ctrl.selectedId) }, [
          ctrl.data().map(function(category) {
            return m('option', { value: category.id }, category.name)
          })
        ])
      }
    }
    //view utility
    app.watchInput = function(ontype, onenter, onescape) {
        return function(e) {
            ontype(e)
            if (e.keyCode == app.ENTER_KEY) onenter()
            if (e.keyCode == app.ESC_KEY) onescape()
        }
    };

    app.view = function(ctrl) {
        return [
  m('div.row',[
    m('div.card',[
        m('div.card__content-wrapper',[
                        m('a[href="#"]',
                        m('h3.card__title','PROFILE INFO')),
                        m('img.card__img[src="img/profile.png"]'),
                        m('p.card__description','Critical parameter for analysis'),
                        m('p.card__description', ''),
                        m.component(DropDownCategory),
                        m('label.subscribe-card__label[for="input_pref"]','Category'),

                        m('input.subscribe-card__field#user_name[placeholder="Enter´s your username"]',{
                            onkeypress: app.watchInput( m.withAttr('value', ctrl.username),
                                                                            ctrl.call_api.bind(ctrl, ctrl.username,$('#input_pref').val())
                                                      ),
                            value: ctrl.username()
                         }),
                        m('label.subscribe-card__label[for="user_name"]','Username'),

                        ctrl.data_user == null ? '' : ctrl.storage_data().error ? m('p.card__description','USER NOT FOUND') : ''

                   ]),
             ]),

             app.request_lichess(ctrl,false),
             ctrl.parameters.user ? app.request_lichess(ctrl,true) : ''
          ]),

          m('div.row',[
            m('div.card#graph_winproba[style="display: none;"]',[

                  m('div.card__content-wrapper',[

                    m('a[href="#"]',
                                m('h3.card__title','YOUR WIN PROBABILITY AGAINST OTHER PLAYERS OF DIFFERENT RATING')),
                    m('div#plot_winporb[style="width: 100%; height: 400px;"]'),
                    m('div#params_winproba')
                    ])

              ]),

            ]),

    ];
  };

})();
