/**
 * Created by Administrator on 2016/6/1.
 */

;(function ($, window, document, undefined) {

    // constructor
    var HailiUI = function (ele) {
        this.$element = ele;

        // public default option
        this.defaults = {
            url: '',
            method: 'get',

            data: [],
            success: function(data) {

            }
        };

    };

    HailiUI.prototype = {
        combobox: function(opt) {
            var defaults = {
                // attributes
                url: '',
                method: '',
                queryParams: {},
                data: [],
                valueField: 'value',
                textField: 'text',

                // events
                onSelect: function(data, elem) {
                    console.log(data);
                },
                onChange: function() {},

                // method
                getValue: function() {},
                getText: function() {},
                getSelect: function() {}
            };

            var settings = $.extend({}, defaults, opt); // extend options

            /*===================== element defined =====================*/

            // input element
            var elem = this.$element;
            elem.attr('readonly', 'readonly');

            // panel element
            var tpl = '' +
                '<div class="haili-combobox-body">'+
                '  <div class="query">'+
                '    <input type="text" placeholder="search">' +
                '    <i class="fa fa-serach"></i>'+
                '  </div>' +
                '  <div class="body">'+
                '    <ul></ul>'+
                '  </div>'+
                '</div>';
            var tplEle = $(tpl);
            tplEle.attr('id', 'cbx' + new Date().getTime());

            // ul element
            var ulElem = tplEle.find('ul');

            // body element
            var bodyElem = $(document.body);


            /*===================== combobox panel position setting =====================*/

            // input element's position
            var positions = elem.position(), // top and left
                offsetHeight  = elem[0].offsetHeight, // padding + border

                // input element's margin
                marginTop = parseInt(elem.css('marginTop').replace('px', '')) || 0,
                marginLeft = parseInt(elem.css('marginLeft').replace('px', '')) || 0,

                // input element's offset
                top = positions.top  + offsetHeight + marginTop,
                left = positions.left + marginLeft;

            // set panel position
            tplEle.css({
                top: top,
                left: left
            });


            // generate item
            var data = [{
                value: '1',
                text: 'text1'
            }, {
                value: '2',
                text: 'text2'
            }, {
                value: '3',
                text: 'text3'
            }, {
                value: '4',
                text: 'text4'
            }, {
                value: '5',
                text: 'text5'
            }];

            // generate data
            for (var i = 0, len = data.length; i < len; i++) {
                var li = $('<li></li>');
                li.text(data[i][settings.textField]);
                li.data(data[i]);
                ulElem.append(li);
            }

            // event proxy, onclick item
            ulElem.click(function(e) {
                var target = $(e.target), selectData = target.data();
                elem.val(selectData[settings.textField]);
                settings.onSelect(selectData, target);
            });

            //
            elem.click(function(e) {
                tplEle.show();
            });


            bodyElem.append(tplEle);

            bodyElem.click(function(e) {
                var target = e.target;

                console.log(target.className);
                if (!$(target).hasClass('haili-combobox')) {
                    tplEle.hide();
                }
            });

        }
    };


    // jquery interface
    $.fn.hailiCombobox = function (options) {
        var hailiUI = new HailiUI(this, options);

        return hailiUI.combobox();
    };

})(jQuery, window, document);

