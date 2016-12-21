window.onload = (function () {
    var ads = {
        _getPlatform: function () {
            var a = navigator.userAgent || navigator.vendor || window.opera;
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
        },
        _isMobile: function () {
            var u = window.navigator.userAgent.toLowerCase();
            if ((/AppleWebKit.*mobile/i.test(u)) || (this._getPlatform()) || (/android/i.test(u)) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(u))) {
                return true
            } else {
                return false
            }
        },
        //判断屏幕方向 or PC
        isHorizontal: function () {
            // console.log("orientation:"+window.orientation);
            // console.log("width>height:"+(window.screen.width >= window.screen.height));
            return (window.orientation == 90 || window.orientation == -90) || (window.screen.width >= window.screen.height);
        },
        isMobile: false,
        server: "{{{$config->host->js}}}",
        redirect: "{{{$config->host->redirect}}}",
        //构建广告容器
        createWrap: function (adInfo) {
            var wrap = document.createElement("div");
            var wrapId = adInfo.sn + "_wrap";
            wrap.setAttribute("id", wrapId);
            var adStyle = this.getWrapStyle(adInfo.data);
            wrap.setAttribute("style", adStyle);
            return wrap;
            // wrap.setAttribute("style", "position:fixed;bottom:0;left;0;width:0;z-index:9999;text-align:center");
        },
        //获取广告展现方式
        getWrapStyle: function (ad) {
            this.isMobile = this._isMobile();
            var isMobile = this.isMobile;
            var style = "";
            console.log("viewType:" + ad.view_type);
            var adw = ad.staff[0].width;
            var adh = ad.staff[0].height;
            switch (parseInt(ad.view_type)) {
                case 1:
                    //qianrushi
                    var rate = 1;

                    if (isMobile && !this.isHorizontal()) {
                        if (adw) {
                            rate = window.screen.width / adw;
                        }
                        style = "position:relative;width:100%;height:" + adh * rate + "px;";
                    } else {
                        style = "position:relative;width:" + adw + "px;height:" + adh + "px;margin:auto;";
                    }
                    break;
                case 2:
                    //chaping
                    var rate = 1;

                    if (isMobile && !this.isHorizontal()) {
                        if (adw) {
                            rate = window.screen.width / adw;
                        }
                        style = "position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:" + adh * rate + "px;z-index:2147483647;margin:auto;";
                    } else {
                        if (adw) {
                            rate = document.body.clientWidth / 2 / adw;
                        }
                        style = "position:fixed;top:0;right:0;bottom:0;left:0;width:50%;height:" + adh * rate + "px;z-index:2147483647;margin:auto;";
                        // style = "position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:auto;z-index:2147483647;margin:auto;background:#000";
                    }
                    break;
                case 32:
                    //ditong
                    if (isMobile && !this.isHorizontal()) {
                        style = "position:fixed;bottom:0;left:0;width:100%;height:auto;min-height:" + adh + "px;z-index:2147483647;";
                    } else {
                        var ml = 0;
                        if (adw) {
                            ml = document.body.clientWidth / 2 - adw / 2;
                        }
                        style = "position:fixed;bottom:0;width:" + adw + "px;height:" + adh + "px;z-index:2147483647;margin-left:" + ml + "px";
                    }

                    break;
                // case 4:
                //     if (ad.data.staff[0].type == 1 || ad.data.staff[0].type == "AD_IMAGE" || ad.data.staff[0].type == 2 || ad.data.staff[0].type == "AD_FLASH") {
                //         api.renderBgAd(ad, ad.data.staff[0]);
                //         return
                //     }
                //     break;
                // case 8:
                //     // alert(8)
                //     api.renderDirect(ad, ad.data.staff[0]);
                //     break;
                // case 64:
                //     api.renderMobileApp(ad, ad.data.staff[0]);
                //     break;
                case 128:
                    //wuxianfubiao
                    style = "position:fixed;display:inline-block;bottom:0;right:0;width:30%;height:auto;z-index:2147483647;";
                    break;
                default:
                    style = "display:inline-block;";
            }
            return style;
        },
        //构建关闭按钮
        createCloseBtn: function () {
            // var btn = document.createElement("span");
            // btn.setAttribute("style", "display:inline-block;position:absolute;right:0;top:0;width:5%;height:auto;cursor:pointer;");
            // btn.setAttribute("onclick", "javascript:this.parentNode.parentNode.style.display='none'");
            var img = document.createElement("img");
            img.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAKwklEQVR4Xu2dQXIbNxZA0TK5IDcWN6wSuRjlBJFPEPkEUW7gOcE4N1BOYN/AmRPEOUGsE4x8gigbdhU3lFfWgkVMQRZliiLZAD5ACb8fq7Sx8H/jv49noNkssTIRr9lsdnhzc/PjYrE4PDg4OIlIQQgE9kngk7vY0dHRRehFK9+AOyl+ttaeGWPcDy8IFEXAWnttjPnofsbj8Z8+k/cSZDKZ/Mdae15V1aFPUsZAoAACV1VV/fvo6Oh2d9n22inIdDo9mc/nfxhjjgsomClCIIbAp16v98tgMHC7y6PXVkHqun6zWCzesWvEMCemMAJXnU7nl+FweLk+742CODmstR8KK5LpQiCagLs/6Xa7r9cleSRIXden1tq/oq9EIAQKJeAk6ff7P6wetx4IUtf18WKx+B/HqkI7zLTFBKy1l+Px+NUy0QNBJpOJ2zlOxVchAQQKJmCt/W08Hp+7Eu4F4WhVcEeZelICq0ete0HYPZIyJlnhBJa7yK0g7t7DWvt34TUxfQikJHA1Go1+uBVkMpm8Nca8S5mdXBAonUCn03m1FMQ9bv+p9IKYPwRSEnDHrKUg7njFx0lS0iWXBgJ/LgWxGqqhBggkJnBRuY+xf/36dZY4MekgUDwB99Cw4vlH8X2kgIwEECQjXFKXTwBByu8hFWQkgCAZ4ZK6fAIIUn4PqSAjAQTJCJfU5RNAkPJ7SAUZCSBIRrikLp8AgpTfQyrISABBMsIldfkEEKT8HlJBRgIIkhEuqcsngCDl95AKMhJAkIxwSV0+AQQpv4dUkJEAgmSES+ryCSBI+T2kgowEECQjXFKXTwBByu8hFWQkgCAZ4ZK6fAIIUn4PqSAjAQTJCJfU5RNAkPJ7SAUZCSBIRrikLp8AgpTfQyrISABBMsIldfkEEKT8HlJBRgIIkhEuqcsngCDl95AKMhJAkIxwSV0+AQQpv4dUkJEAgmSES+ryCSBI+T2kgowEtAvypaqqt9ba98aYlxk5tjK1tfZzVVW/a/6GZM2CfOl0OqfD4fByOp2ezOdz902+SJJIZSdHv98/HQwG13Vdv7HWfkiU+lml0SrIvRxL2kiSbt2tyrHMqlUSjYI8kgNJ8sqhWRJtgmyVA0nkkmzaOdazattJNAnSKAeSxEviI4fGnUSNINba6263+9rdlPssA+5JfCh9GxMihxuvaRdRI8hdI5HEf917jWyzHA6QKkGQxGvNew9quxwqBUES7/W/cyByfMOjbgdZdp17knhRkOM7O7WCsJPECYIcD7mpFgRJwiRBjse81AuCJH6SIMdmTq0QBEl2S4Ic2/m0RhAk2bwIkGP3fx6tEgRJHi4G5Gg+frZOECT5tiiQo1kO1c9Bmspv83MS5GhaHS15DtKEoY2SIEfTqmjZc5AmHG2SBDmaVkNLn4M0YWmDJMjRtApa/hykCY9mSZCjqfs8B/EipFES5PBq/dZBrXybdxcyTZIgh0yOVr/Nq10S5JDLgSA7GJa8kyBHGjkQpIFjiZIgRzo5EMSDZUmSIIdHQwOHcJPuAawESZDDo5ERQxDEE9pzlgQ5PJsYMQxBAqA9R0mQI6CBEUMRJBDac5IEOQKbFzEcQSKgPQdJkCOicREhCBIBzYU8pSTIEdm0iDAEiYC2DHkKSZBD0LCIUASJgLYask9JkEPYrIhwBImAth6yD0mQI0GjIlIgSAS0TSE5JUGORE2KSIMgEdC2heSQBDkSNigiFYJEQNsVklIS5EjcnIh0CBIBrSkkhSTI0UR5P79HkEycJZIgR6amRKRFkAhoviGRkrzv9Xpng8Hg2uc6mr4w06fefY9BkMzEQyUJmQ5yhNCKG4sgcdyConJIghxBLYgejCDR6MICU0qCHGHsJaMRREIvMDaFJMgRCF04HEGEAEPDJZIgRyht+XgEkTMMzhAjCXIEY04SgCBJMIYlCX3O4bJPp9OT+Xz+yRjzMuxqjJYQQBAJvYjYGDmWl0GSCODCEAQRAgwJl8iBJCGk041FkHQsd2ZKIQeS7KlZK5dBkD0wTykHkuyhYQiyP8ihcsxms0Pfz2FxT5K/j+wgGRmHyuHeyl0sFu+63e7r4XB46TM1JPGhFD8GQeLZJb3nWH3OEfqcBEkyNdEYgyAZ2MbsHNbaD6tTQZIMjYlIiSAR0HaFpJBjmR9JEjcnIh2CREDbFpJSDiRJ2BhBKgQRwFs7En3u9/unvu9AhXy2ip0kUZMi0iBIBLT1kBw7x4ZrXPPuVoJmBaZAkEBgTyEHxy1hkwThCCKAt4+dg51E0KAEoQgSCfEp5GAniWyWIAxBIuA9pRxIEtEwQQiCBMJ7DnIgSWDTBMMRJADec5IDSQIaJxiKIJ7wnqMcSOLZPMEwBPGA95zlQBKPBgqGIEgDvBLkQBKBAQ2hCLIDUElyIEkeSRBkC9cS5UCS9JIgyAamJcuBJGklQZA1nhrkQJJ0kiDICktNciBJGkkQ5I6jRjmQRC4JghhjNMuBJDJJWi9IG+RAknhJWi1Im+RAkjhJWitIG+VAknBJWilIm+VAkjBJWicIcnxfIPy1lGZZWiUIcjxeEEiyW5LWCIIc2xcCkmxn0wpBkKP5KIEkmxmpFwQ5muXgxr2lOwhy+MuBJC3bQZAjXA4kecxM5RELOeLlQJKH7NQJghxyOZDkO0NVgiBHOjmQ5BsBNYIgR3o5kESXIN7fnxHy5TX5ll1ZmUOek2jiq2YHccvNp4mamrdvxdrIV5UgTZIgh1ypXZJo5KtOkG2SaGyefLnHZdgkiVa+KgVZl0Rr8+KWd5qoVUk081UryFKSg4OD99ba8zTLgiyrBJwk2vmqFoTlDAEpAQSREiReNQEEUd1eipMSQBApQeJVE0AQ1e2lOCkBBJESJF41AQRR3V6KkxJAEClB4lUTQBDV7aU4KQEEkRIkXjUBBFHdXoqTEkAQKUHiVRNAENXtpTgpAQSREiReNQEEUd1eipMSQBApQeJVE0AQ1e2lOCkBBJESJF41AQRR3V6KkxJAEClB4lUTQBDV7aU4KQEEkRIkXjUBBFHdXoqTEkAQKUHiVRNAENXtpTgpAQSREiReNQEEUd1eipMSQBApQeJVE0AQ1e2lOCkBBJESJF41AQRR3V6KkxJAEClB4lUTQBDV7aU4KYHKJZhMJlaaiHgIaCNgrf2MINq6Sj0pCVwsBbkyxvwrZWZyQUABgf8uBflojPlZQUGUAIGUBH5dCvLWGPMuZWZyQaB0Ap1O59WtIHVdH1tr/y69IOYPgYQE/hmNRse3gty9k/XJGPNTwguQCgLFErDW/jYej8/vBanr+tRa+1exFTFxCKQj8KXX6x0PBoPre0HudhFu1tNBJlO5BH4djUbv3fQfCHJ3L3JpjHlZbm3MHALxBNzDwfF4fLLM8ECQuxt2jlrxfIksm8D90WqrIHeSvLHWfii7VmYPgSACXzqdzulwOHQnqPvXox1k+ZvJZHJmjPmd41YQZAYXSMAdq7rd7pt1OR7dg6zXNp1OT+bzubtx52MoBTaeKXsRuOj1emfuHatNo7fuIKuD67p2R65zRPECzqAyCFxUVXV+dHTknv9tfXkJ4qJns9nhzc3NmbXWHb1OOXqVsQqY5QMC/xhjnBAfR6OROxk1vrwFWc/kHiy6f7PWnlhrDxuvxAAIPAGBg4MD90n1qxcvXlxvusdomtL/ARpAIyPorsY3AAAAAElFTkSuQmCC");
            img.setAttribute("style", "position:absolute;right:0;top:0;width:5%;height:auto;cursor:pointer;");
            img.setAttribute("onclick", "javascript:this.parentNode.parentNode.style.display='none'");
            // btn.appendChild(img);

            return img;
        },
        //填充广告
        createContent: function (ad) {

            // var recordClick = function (href) {
            //     //统计
            //     var iframe = document.createElement("iframe");
            //     var host = ad.data.click_js.indexOf("http") == 0 ? ad.data.click_js : "//" + ad.data.click_js;
            //     var recordUrl = host + "?aid=" + ad.data.aid+"&pushid="+ ad.data.pushid+"&spid="+ ad.data.spid+"&src="+ ad.data.src;
            //     // alert(adInfo.data.show_js);
            //     iframe.setAttribute("src", recordUrl);
            //     iframe.setAttribute("style", "display:none");
            //     document.body.appendChild(iframe);
            //
            //     location.href = href;
            // }

            var div = document.createElement("div");
            div.setAttribute("style", "display:inline-block;width:100%;height:auto;position:relative");

            if (ad.staff[0]["addr"]) {
                // var a = document.createElement("a");
                // a.setAttribute("href", ad.staff[0].landing_page.indexOf("http") == 0 ? ad.staff[0].landing_page : "//" + ad.staff[0].landing_page);
                var img = document.createElement("img");
                img.setAttribute("src", ad.staff[0].addr);
                img.setAttribute("style", "width:100%;height:auto");

                //统计点击
                // var iframe = document.createElement("iframe");
                // var host = ad.click_js.indexOf("http") == 0 ? ad.click_js : "//" + ad.click_js;
                // var recordUrl = host + "?aid=" + ad.aid + "&pushid=" + ad.pushid + "&spid=" + ad.spid + "&src=" + ad.src;
                // iframe.setAttribute("src", recordUrl);
                // iframe.setAttribute("style", "display:none");
                // img.setAttribute("onclick", "javascript:document.body.appendChild(" + iframe + ");");

                var host = ad.click_js.indexOf("http") == 0 ? ad.click_js : "//" + ad.click_js;
                var recordUrl = host + "?&aid=" + ad.aid + "&pushid=" + ad.pushid + "&spid=" + ad.spid + "&src=" + ad.src+ "?" + Math.ceil(Math.random() * 100000000);
                var href = ad.staff[0].landing_page.indexOf("http") == 0 ? ad.staff[0].landing_page : "//" + ad.staff[0].landing_page;
                img.setAttribute("onclick", "javascript:var iframe=document.createElement('iframe');iframe.setAttribute('src', '"+recordUrl+"');iframe.setAttribute('style', 'display:none');document.body.appendChild(iframe);location.href = '"+href+"';");
                // location.href = "+href+";
                // a.appendChild(img);
                div.appendChild(img);
                var closeBtn = this.createCloseBtn();
                div.appendChild(closeBtn);
                return div;
                // var isMobile = this.isMobile;
                // if (isMobile && !this.isHorizontal()) {
                //     img.setAttribute("style", "width:100%;height:auto");
                // } else {
                //     img.setAttribute("style", "width:" + ad.staff[0].width + "px;height:" + ad.staff[0].height + "px;");
                //     div.setAttribute("style", "display:inline-block;width:" + ad.staff[0].width + "px;height:auto;position:relative");
                // }
            } else if (ad.staff[0]["text"]) {
                var script = document.createElement("script");
                script.setAttribute("src", ad.staff[0]["text"]);

                return script;
            }
        },
        getAd: function (adInfo) {
            var wrap = this.createWrap(adInfo);
            var content = this.createContent(adInfo.data);
            wrap.appendChild(content);

            //统计
            var iframe = document.createElement("iframe");
            var host = adInfo.data.show_js.indexOf("http") == 0 ? adInfo.data.show_js : "//" + adInfo.data.show_js;
            var recordUrl = host + "?aid=" + adInfo.data.aid + "&pushid=" + adInfo.data.pushid + "&spid=" + adInfo.data.spid + "&src=" + adInfo.data.src;
            // alert(adInfo.data.show_js);
            iframe.setAttribute("src", recordUrl);
            iframe.setAttribute("style", "display:none");
            document.body.appendChild(iframe);

            return wrap;
        },

    }

    //用于jsonp回调
    window["ebshowad"] = function (data) {
        console.log(data);
        // console.log(ads);
        var wrap = ads.getAd(data);
        document.body.appendChild(wrap);
        // console.log(wrap);
    }

    function jsonp(options) {
        options = options || {};
        if (!options.url) {
            throw new Error("参数不合法");
        }

        //创建 script 标签并加入到页面中
        var oHead = document.getElementsByTagName('head')[0];
        var oS = document.createElement('script');
        oHead.appendChild(oS);

        //发送请求
        oS.src = options.url;

        //超时处理
        if (options.time) {
            oS.timer = setTimeout(function () {
                oHead.removeChild(oS);
                options.fail && options.fail({message: "超时"});
            }, time);
        }
    };


    var _ads = "{{{$config->host->ads}}}";
    _ads = "http://" + _ads + "/";
    var sn = "ads" + Math.ceil(Math.random() * 100000000);
    var para = "?sn=" + sn;
    if (typeof bcdata_aid != "undefined") {
        para += "&aid=" + bcdata_aid
    }
    if (typeof bcdata_spid != "undefined") {
        para += "&spid=" + bcdata_spid
    }
    if (typeof bcdata_sp != "undefined") {
        para += "&sp=" + bcdata_sp
    }
    if (typeof sda_man != "undefined" && sda_man != "") {
        para += "&sda_man=" + sda_man
    }
    if (typeof bcdata_slotid != "undefined") {
        para += "&slotid=" + bcdata_slotid
    }
    if (typeof bcdata_src != "undefined") {
        para += "&src=" + bcdata_src
    }
    if (typeof bcdata_viewtype != "undefined") {
        para += "&src=" + bcdata_viewtype
    }
    if (typeof bcdata_w != "undefined") {
        para += "&w=" + bcdata_w
    }
    if (typeof bcdata_h != "undefined") {
        para += "&h=" + bcdata_h
    }
    if (typeof bcdata_atype != "undefined") {
        para += "&atype=" + bcdata_atype
    }
    if (typeof bcdata_pushid != "undefined") {
        para += "&pushid=" + bcdata_pushid;
    }
    if (ads._isMobile()) {
        para += "&mobile=1"
    } else {
        para += "&mobile=0"
    }
    var w_width = document['body']['clientWidth'] || document['body']['scrollWidth'];
    var s_width = window.screen.width || window.screen.availHeight;
    var zoom = w_width / s_width;
    if (zoom == 1) {
        para += "&mobileFixed=1"
    } else {
        para += "&mobileFixed=0"
    }
    para += "&width_page=" + w_width;
    para += "&width_screen=" + s_width;

    para += "&url=" + encodeURI(window.location.href);
    var infojsUrl = _ads + "info.js" + para;
    // console.log(infojsUrl);
    jsonp({
        url: infojsUrl,
        type: "GET",
        success: function (response, xml) {
            console.log("success")
        },
        fail: function (status) {
            console.log("fail")
        }
    });
})();
