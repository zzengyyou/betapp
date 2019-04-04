Array.prototype.clone = function () {
    return this.concat()
};
Array.prototype.reOrder = function (d) {
    var c = this.clone();
    for (var a = 0; a < d.length; a++) {
        this[d[a]] = c[a]
    }
    return this
};
String.prototype.strTrimStart = function (c) {
    if (!c) {
        return this
    }
    var a = this;
    while (true) {
        if (a.substr(0, c.length) != c) {
            break
        }
        a = a.substr(c.length)
    }
    return a
};
String.prototype.strTrimEnd = function (c) {
    if (!c) {
        return this
    }
    var a = this;
    while (true) {
        if (a.substr(a.length - c.length, c.length) != c) {
            break
        }
        a = a.substr(0, a.length - c.length)
    }
    return a
};
if (typeof [].findIndex === "undefined") {
    Array.prototype.findIndex = Array.prototype.findIndex || function (f) {
        if (this === null) {
            throw new TypeError("Array.prototype.findIndex called on null or undefined")
        } else {
            if (typeof f !== "function") {
                throw new TypeError("callback must be a function")
            }
        }
        var e = Object(this);
        var d = e.length >>> 0;
        var a = arguments[1];
        for (var c = 0; c < d; c++) {
            if (f.call(a, e[c], c, e)) {
                return c
            }
        }
        return -1
    }
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function (g, d) {
        if (!((typeof g === "Function") && this)) {
            throw new TypeError()
        }
        var a = this.length >>> 0, f = new Array(a), h = 0, e = -1;
        if (d === undefined) {
            while (++e !== a) {
                if (e in this) {
                    if (g(t[e], e, t)) {
                        f[h++] = t[e]
                    } else {
                        while (++e !== a) {
                            if (e in this) {
                                if (g.call(d, t[e], e, t)) {
                                    f[h++] = t[e]
                                }
                            }
                        }
                    }
                }
            }
        }
        f.length = h;
        return f
    }
}
if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, "classList", {
        get: function () {
            var a = this;

            function c(d) {
                return function (g) {
                    var f = a.className.split(/\s+/g), e = f.indexOf(g);
                    d(f, e, g);
                    a.className = f.join(" ")
                }
            }

            return {
                add: c(function (e, d, f) {
                    if (!~d) {
                        e.push(f)
                    }
                }), remove: c(function (e, d) {
                    if (~d) {
                        e.splice(d, 1)
                    }
                }), toggle: c(function (e, d, f) {
                    if (~d) {
                        e.splice(d, 1)
                    } else {
                        e.push(f)
                    }
                }), contains: function (d) {
                    return !!~a.className.split(/\s+/g).indexOf(d)
                }, item: function (d) {
                    return a.className.split(/\s+/g)[d] || null
                }
            }
        }
    })
}
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment) {
    Range.prototype.createContextualFragment = function (a) {
        var d = document.createDocumentFragment(), c = document.createElement("div");
        d.appendChild(c);
        c.outerHTML = a;
        return d
    }
}
jQuery.fn.center = function () {
    this.css("position", "fixed");
    var c = $(window);
    var a = $(this);
    this.css("top", ((c.height() / 2) - (a.outerHeight() / 2)) + "px");
    this.css("left", ((c.width() / 2) - (a.outerWidth() / 2)) + "px");
    return this
};
module.exports.sportsSys = new function () {
    this.Ajax = new function () {
        this.POST = function (methodUrl, dataJSON, callbackFunc) {
            var argv = sportsSys.Ajax.POST.arguments;
            var isAsync = (argv.length > 3) ? argv[3] : true;
            var OnErrorFunc = (argv.length > 4) ? argv[4] : sportsSys.Ajax.OnError;
            jQuery.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: (dataJSON == null) ? "{}" : JSON.stringify(dataJSON),
                dataType: "json",
                async: isAsync,
                url: methodUrl,
                success: function (result) {
                    callbackFunc(result.d)
                },
                error: OnErrorFunc
            })
        };
        this.WebMethodPOST = function (methodUrl, dataJSON, callbackFunc) {
            var argv = sportsSys.Ajax.WebMethodPOST.arguments;
            var isAsync = (argv.length > 3) ? argv[3] : true;
            var OnErrorFunc = (argv.length > 4) ? argv[4] : sportsSys.Ajax.OnError;
            window.setTimeout(function () {
                sportsSys.Ajax.POST(methodUrl, dataJSON, callbackFunc, isAsync, OnErrorFunc)
            }, 10)
        };
        this.WebMethodUnDelayPOST = function (methodUrl, dataJSON, callbackFunc) {
            var argv = sportsSys.Ajax.WebMethodUnDelayPOST.arguments;
            var isAsync = (argv.length > 3) ? argv[3] : true;
            var OnErrorFunc = (argv.length > 4) ? argv[4] : sportsSys.Ajax.OnError;
            sportsSys.Ajax.POST(methodUrl, dataJSON, callbackFunc, isAsync, OnErrorFunc)
        };
        this.OnError = function (xhr, ajaxOptions, thrownError) {
            try {
                console.log(xhr.responseText + "@@" + thrownError)
            } catch (ex) {
            }
            jAlert("System error !!", Keno_sys_text_001, function () {
                location.href = location.href
            }, null)
        };
        this.getScript = function (url, callback) {
            var script;
            script = document.createElement("script");
            script.setAttribute("language", "javascript");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", url);
            var done = false;
            vObj = script.onload;
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                    done = true;
                    if (typeof callback === "function") {
                        callback(this.ownerDocument.attributes)
                    }
                    if (this.tagName.toLowerCase() == "script") {
                        document.getElementsByTagName("head")[0].removeChild(this)
                    }
                }
            };
            var head = document.getElementsByTagName("head")[0];
            head.appendChild(script)
        }
    };
    this.Common = new function () {
        this.sprintf = function () {
            if (!arguments || arguments.length < 1 || !RegExp) {
                return
            }
            var str = arguments[0];
            var re = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
            var a = b = [], numSubstitutions = 0, numMatches = 0;
            var res = "";
            while (a = re.exec(str)) {
                var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
                var pPrecision = a[5], pType = a[6], rightPart = a[7];
                numMatches++;
                if (pType == "%") {
                    subst = "%"
                } else {
                    numSubstitutions++;
                    if (numSubstitutions >= arguments.length) {
                        alert("Error! Not enough function arguments (" + (arguments.length - 1) + ", excluding the string)\nfor the number of substitution parameters in string (" + numSubstitutions + " so far).")
                    }
                    var param = arguments[numSubstitutions];
                    var pad = "";
                    if (pPad && pPad.substr(0, 1) == "'") {
                        pad = leftpart.substr(1, 1)
                    } else {
                        if (pPad) {
                            pad = pPad
                        }
                    }
                    var justifyRight = true;
                    if (pJustify && pJustify === "-") {
                        justifyRight = false
                    }
                    var minLength = -1;
                    if (pMinLength) {
                        minLength = parseInt(pMinLength)
                    }
                    var precision = -1;
                    if (pPrecision && pType == "f") {
                        precision = parseInt(pPrecision.substring(1))
                    }
                    var subst = param;
                    if (pType == "b") {
                        subst = parseInt(param).toString(2)
                    } else {
                        if (pType == "c") {
                            subst = String.fromCharCode(parseInt(param))
                        } else {
                            if (pType == "d") {
                                subst = parseInt(param) ? parseInt(param) : 0
                            } else {
                                if (pType == "u") {
                                    subst = Math.abs(param)
                                } else {
                                    if (pType == "f") {
                                        subst = (precision > -1) ? Math.round(parseFloat(param) * Math.pow(10, precision)) / Math.pow(10, precision) : parseFloat(param)
                                    } else {
                                        if (pType == "o") {
                                            subst = parseInt(param).toString(8)
                                        } else {
                                            if (pType == "s") {
                                                subst = param
                                            } else {
                                                if (pType == "x") {
                                                    subst = ("" + parseInt(param).toString(16)).toLowerCase()
                                                } else {
                                                    if (pType == "X") {
                                                        subst = ("" + parseInt(param).toString(16)).toUpperCase()
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                res += leftpart + subst;
                str = rightPart
            }
            return res + str
        };
        this.getRandom = function (intMax) {
            var intR = Math.floor(Math.random() * (intMax + 1));
            if (intR == 0) {
                intR = 1
            }
            return intR
        };
        this.repSpecialWord = function (strText) {
            strText = strText.replace(/^\s+|\s+$/g, "").replace(/^[\s　]+|[\s　]+$/g, "");
            strText = strText.replace(/'/g, "");
            strText = strText.replace(/"/g, "");
            strText = strText.replace(/</g, "＜");
            strText = strText.replace(/>/g, "＞");
            return strText
        };
        this.parseTimeToGMT8 = function (time) {
            time.setTime(time.getTime() + (time.getTimezoneOffset() * 60 * 1000) + (8 * 60 * 60 * 1000));
            return time
        };
        this.parseTimeToGMTX = function (time, X) {
            return time.setTime(time.getTime() + (-1 * 8 * 60 * 60 * 1000) + (X * 60 * 60 * 1000))
        };
        this.parseTimeGMT = function () {
            return (new Date().getTimezoneOffset() / 60) * -1
        };
        this.formatAMPM = function (date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            return [sportsSys.Common.paddingLeft(hours.toString(), 2) + ":" + sportsSys.Common.paddingLeft(minutes.toString(), 2), ampm]
        };
        this.getSysTime = function (callbackfunc) {
            if (typeof (jQuery) != "undefined") {
                jQuery.ajax({
                    type: "POST",
                    data: {systime: "get"},
                    async: true,
                    url: "/Common/SysSVC.ashx?v=" + sportsSys.Common.getRandom(9999999).toString(),
                    success: function (result) {
                        callbackfunc(new Date(result))
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        callbackfunc(sportsSys.Common.parseTimeToGMT8(new Date()))
                    }
                })
            } else {
                callbackfunc(sportsSys.Common.parseTimeToGMT8(new Date()))
            }
        };
        this.CalculateCountDownTime = function (startTime, endTime) {
            var sTime = new Date(startTime);
            var eTime = new Date(endTime);
            var sec = (eTime - sTime) / 1000;
            return (sec <= 0) ? 0 : sec
        };
        this.GetCookieVal = function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if (endstr == -1) {
                endstr = document.cookie.length
            }
            return decodeURIComponent(document.cookie.substring(offset, endstr))
        };
        this.SetCookie = function (name, value) {
            var expdate = new Date();
            var argv = sportsSys.Common.SetCookie.arguments;
            var argc = sportsSys.Common.SetCookie.arguments.length;
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : null;
            var domain = (argc > 4) ? argv[4] : null;
            var secure = (argc > 5) ? argv[5] : false;
            if (expires != null) {
                expdate.setTime(expdate.getTime() + (expires * 1000))
            }
            document.cookie = name + "=" + encodeURIComponent(value) + ((expires == null) ? "" : ("; expires=" + expdate.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "")
        };
        this.DelCookie = function (name) {
            var exp = new Date();
            exp.setDate(exp.getDate() - 1);
            var cval = sportsSys.Common.GetCookie(name);
            document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString()
        };
        this.GetCookie = function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg) {
                    return sportsSys.Common.GetCookieVal(j)
                }
                i = document.cookie.indexOf(" ", i) + 1;
                if (i == 0) {
                    break
                }
            }
            return null
        };
        this.AddComma = function (num) {
            num = num + "";
            var re = /(-?\d+)(\d{3})/;
            while (re.test(num)) {
                num = num.replace(re, "$1,$2")
            }
            return num
        };
        this.RemoveComma = function (val) {
            return val.replace(/[,]+/g, "")
        };
        this.accMul = function (arg1, arg2) {
            var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
            if (s1.indexOf(".") != -1) {
                m += s1.split(".")[1].length
            }
            if (s2.indexOf(".") != -1) {
                m += s2.split(".")[1].length
            }
            var vResult = Number(s1.replace(".", "")) * Number(s2.replace(".", ""));
            vResult = vResult / Math.pow(10, m);
            var vResultArr = vResult.toString().split(".");
            if (vResultArr.length > 1) {
                vResult = eval(vResultArr[0] + "." + vResultArr[1].substring(0, 2))
            }
            return vResult
        };
        this.GetQueryStringParams = function (sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split("&");
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split("=");
                if (sParameterName[0] == sParam) {
                    return sParameterName[1]
                }
            }
            return ""
        };
        this.getURLParameter = function (name) {
            return decodeURIComponent((new RegExp("[?|&]" + name + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
        };
        this.parseDateToUnixTimeStamp = function (vDate) {
            return parseInt(new Date(vDate).getTime() / 1000)
        };
        this.parseUnixTimeStampToDate = function (vTimeStamp) {
            return new Date(vTimeStamp * 1000)
        };
        this.sortByKey = function (array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            })
        };
        this.SetBlockUI = function (blockId) {
            if (typeof (jQuery) != "undefined") {
                var obj = new Object();
                obj = (typeof blockId === "string") ? $("#" + blockId) : blockId;
                $(obj).block({
                    message: '<img src="' + AW_GB_LOADINGIMG_PATH + '"></img>',
                    css: {border: "0px solid #000", backgroundColor: "#fff", width: "120px", height: "120px"},
                    overlayCSS: {backgroundColor: "#FFFFFF", opacity: "1"}
                })
            }
        };
        this.paddingLeft = function (str, lenght) {
            if (str.length >= lenght) {
                return str
            } else {
                return sportsSys.Common.paddingLeft("0" + str, lenght)
            }
        };
        this.paddingRight = function (str, lenght) {
            if (str.length >= lenght) {
                return str
            } else {
                return sportsSys.Common.paddingRight(str + "0", lenght)
            }
        };
        this.compressToJSON = function (pubhcolumn, pushdata) {
            var vPlusIndexColumn = false;

            var vHeaderArr = pubhcolumn.split(vJSON_COLUMN_NAME_SPLIT);
            var vBodyArr = pushdata.split(vJSON_DATA_ROW_SPLIT);
            var vResult = "";
            var vbodyLen = vBodyArr.length;
            var vheaderLen = vHeaderArr.length;
            var i = 0;
            while (i < vbodyLen) {
                if (vPlusIndexColumn == true) {
                    vBodyArr[i] += vJSON_DATA_COLUMN_SPLIT + i.toString()
                }
                vBodyRowArr = vBodyArr[i].split(vJSON_DATA_COLUMN_SPLIT);
                vResult += "{";
                var j = 0;
                while (j < vheaderLen) {
                    vResult += '"' + vHeaderArr[j] + '":"' + vBodyRowArr[j] + '"' + ((j == vheaderLen - 1) ? "" : ",");
                    j++
                }
                vResult += "}" + ((i == vbodyLen - 1) ? "" : ",");
                i++
            }
            return (pushdata == "") ? [] : JSON.parse("[" + vResult + "]")
        };
        this.compressToMultiJSON = function (pubhcolumn, pushdata, JSON_DATA_COLUMN_SPLIT, JSON_DATA_ROW_SPLIT, columnIndex, rtnstr) {
            var vHeaderArr = pubhcolumn[columnIndex].split(Splr.head);
            var vBodyArr = pushdata.split(JSON_DATA_ROW_SPLIT);
            var vResult = "";
            for (var i = 0; i < vBodyArr.length; i++) {
                var vBodyRowArr = vBodyArr[i].split(JSON_DATA_COLUMN_SPLIT);
                vResult += "{";
                for (var j = 0; j < vHeaderArr.length; j++) {
                    var veachBodyRowArr = vBodyRowArr[j];
                    if (typeof vBodyRowArr[j] !== "undefined" && vBodyRowArr[j].length > 3 && vBodyRowArr[j].substr(0, 4) == "[sl]") {
                        veachBodyRowArr = this.compressToMultiJSON(pubhcolumn, vBodyRowArr[j].substr(6, vBodyRowArr[j].length - 6), vBodyRowArr[j].substr(4, 1), vBodyRowArr[j].substr(5, 1), columnIndex + 1, true)
                    } else {
                        veachBodyRowArr = '"' + veachBodyRowArr + '"'
                    }
                    vResult += '"' + vHeaderArr[j] + '":' + veachBodyRowArr + ((j == vHeaderArr.length - 1) ? "" : ",")
                }
                vResult += "}" + ((i == vBodyArr.length - 1) ? "" : ",")
            }
            if (rtnstr == true) {
                return "[" + vResult + "]"
            } else {
                return (pushdata == "") ? [] : $.parseJSON("[" + vResult + "]")
            }
        };
        this.JsonToValueString = function (JsonData) {
            var vJsonValStr = "";
            $.each(JsonData, function (i, item) {
                var vstrArr = JSON.stringify(item).split(',"');
                $.each(vstrArr, function (j, subitem) {
                    var vsubsplit = subitem.replace(subitem.split(":")[0] + ":", "");
                    vJsonValStr += vsubsplit.replace("}", "") + vJSON_DATA_COLUMN_SPLIT
                });
                vJsonValStr = vJsonValStr.substring(0, vJsonValStr.length - 1) + vJSON_DATA_ROW_SPLIT
            });
            var varrJsonValStr = vJsonValStr.split(vJSON_DATA_ROW_SPLIT);
            varrJsonValStr.splice(varrJsonValStr.length - 1, 1);
            vJsonValStr = varrJsonValStr.join(vJSON_DATA_ROW_SPLIT);
            return vJsonValStr
        };
        this.CheckKeyCode = function CheckKey(e) {
            var code = e.keyCode ? e.keyCode : e.which;
            return code
        };
        this.CheckScrollbar = function (obj, arg) {
            var flag = true;
            var argv = sportsSys.Common.CheckScrollbar.arguments;
            var arg1 = (argv.length > 2) ? argv[2] : false;
            if (flag) {
                var valwaysVisible = true;
                if (obj.selector == ".main-content-wrapper" || obj.selector == ".right-aside-inner" || arg1 == true) {
                    valwaysVisible = true
                }
                if (obj.selector == ".main-content-wrapper") {
                    obj = $(".main-content")
                }
                switch (arg.state) {
                    case"update":
                        obj.slimScroll({destroy: true}).slimScroll({
                            height: arg.height,
                            railColor: arg.railColor,
                            size: arg.size,
                            color: arg.color,
                            alwaysVisible: valwaysVisible,
                            railVisible: valwaysVisible
                        });
                        break;
                    case"top":
                        obj.slimScroll({destroy: true}).slimScroll({
                            height: arg.height,
                            railColor: arg.railColor,
                            size: arg.size,
                            color: arg.color,
                            alwaysVisible: valwaysVisible,
                            railVisible: valwaysVisible
                        });
                        break;
                    case"destroy":
                        obj.slimScroll({destroy: true});
                        break;
                    case"height":
                        obj.slimScroll({
                            height: arg.height,
                            railColor: arg.railColor,
                            size: arg.railsize,
                            color: arg.color,
                            alwaysVisible: valwaysVisible,
                            railVisible: valwaysVisible
                        });
                    case"scrollTo":
                        obj.slimScroll({
                            height: arg.height,
                            railColor: arg.railColor,
                            size: arg.size,
                            color: arg.color,
                            alwaysVisible: true,
                            railVisible: true,
                            scrollTo: arg.scrollTo
                        });
                        break;
                    default:
                        obj.slimScroll({
                            height: arg.height,
                            railColor: arg.railColor,
                            size: arg.railsize,
                            color: arg.color,
                            alwaysVisible: valwaysVisible,
                            railVisible: valwaysVisible
                        });
                        break
                }
            } else {
                if (obj.selector.indexOf("-inner")) {
                    obj = $(obj.selector.replace("-inner", ""))
                }
                switch (arg.state) {
                    case"update":
                        obj.mCustomScrollbar(arg.state);
                        break;
                    case"top":
                        obj.mCustomScrollbar("scrollTo", arg.state);
                        break;
                    case"destroy":
                        obj.mCustomScrollbar(arg.state);
                        break;
                    default:
                        if (obj.selector == ".main-content-wrapper") {
                            obj.height(arg.height).mCustomScrollbar({
                                mouseWheel: {deltaFactor: 90},
                                callbacks: {
                                    onTotalScroll: function () {
                                    }
                                }
                            })
                        } else {
                            obj.height(arg.height).mCustomScrollbar({mouseWheel: {deltaFactor: 90}})
                        }
                        break
                }
            }
        };
        this.SetPageLoadBlock = function () {
            var divloading = $("#divloading");
            divloading.height(window.innerHeight);
            sportsSys.Common.SetBlockUI(divloading)
        };
        this.SetPageLoadUnBlock = function () {
            var divloading = $("#divloading");
            divloading.unblock();
            divloading.slideUp(200, function () {
                $(this).remove()
            })
        };
        this.fragmentFromString = function (strHTML) {
            return document.createRange().createContextualFragment(strHTML)
        }
    };
    this.Page = new function () {
        this.PagerCtrl = function (TotalCounts, countsPerPage, currentPage, ScriptName) {
            if (TotalCounts > 0) {
                var TotalPages = (TotalCounts % countsPerPage == 0) ? TotalCounts / countsPerPage : (Math.floor(TotalCounts / countsPerPage)) + 1;
                var firstPg = Keno_page_001;
                var lPg = "«";
                var nPg = "»";
                var finalPg = Keno_page_002;
                var Pgs = "";
                if (TotalPages == 1) {
                    firstPg = '<a href="javascript:void(0);">' + firstPg + "</a>";
                    lPg = '<a href="javascript:void(0);">' + lPg + "</a>";
                    nPg = '<a href="javascript:void(0);">' + nPg + "</a>";
                    finalPg = '<a href="javascript:void(0);">' + finalPg + "</a>"
                } else {
                    if (currentPage == 1) {
                        firstPg = '<a href="javascript:void(0);">' + firstPg + "</a>";
                        lPg = '<a href="javascript:void(0);">' + lPg + "</a>";
                        nPg = "<a href='javascript:" + ScriptName + "(" + (currentPage + 1) + ")'>" + nPg + "</a>";
                        finalPg = "<a href='javascript:" + ScriptName + "(" + TotalPages + ")'>" + finalPg + "</a>"
                    } else {
                        if ((1 < currentPage) && (currentPage < TotalPages)) {
                            firstPg = "<a href='javascript:" + ScriptName + "(1)'>" + firstPg + "</a>";
                            lPg = "<a href='javascript:" + ScriptName + "(" + (currentPage - 1) + ")'>" + lPg + "</a>";
                            nPg = "<a href='javascript:" + ScriptName + "(" + (currentPage + 1) + ")'>" + nPg + "</a>";
                            finalPg = "<a href='javascript:" + ScriptName + "(" + TotalPages + ")'>" + finalPg + "</a>"
                        } else {
                            if (currentPage == TotalPages) {
                                firstPg = "<a href='javascript:" + ScriptName + "(1)'>" + firstPg + "</a>";
                                lPg = "<a href='javascript:" + ScriptName + "(" + (currentPage - 1) + ")'>" + lPg + "</a>";
                                nPg = '<a href="javascript:void(0);">' + nPg + "</a>";
                                finalPg = '<a href="javascript:void(0);">' + finalPg + "</a>"
                            }
                        }
                    }
                }
                var sPg = Math.floor((currentPage - 1) / 10) * 10 + 1;
                var ePg = ((sPg + 9) > TotalPages) ? TotalPages : (sPg + 9);
                for (var i = sPg; i <= ePg; i++) {
                    Pgs += (currentPage == i) ? "<strong>" + i + "</strong>" : "<a href='javascript:" + ScriptName + "(" + i + ")'>" + i + "</a>"
                }
                return "<section class='text-center'><p>" + Keno_page_003 + "&nbsp;<b>" + TotalCounts.toString() + "</b>&nbsp;" + Keno_page_004 + "</p></section><section class='page-wrap text-center'>" + firstPg + lPg + Pgs + nPg + finalPg + Keno_page_005 + "<input size='4' onkeyup='sportsSys.Page.FieldCheck_NumbersOnly(this);if((event.keyCode ? event.keyCode : event.which) == 13 && this.value != \"\" && this.value <= " + TotalPages + "){ " + ScriptName + "(this.value) }' type='text' />" + Keno_page_006 + "</section>"
            } else {
                return "<section class='text-center'><p>" + Keno_page_003 + "&nbsp;<b>" + TotalCounts.toString() + "</b>&nbsp;" + Keno_page_004 + "</p></section>"
            }
        };
        this.FieldCheck_NumbersOnly = function (Object) {
            var FieldValue = Object.value;
            var ValidCharacter = /^[0-9]+$/;
            if (!ValidCharacter.test(FieldValue)) {
                Object.value = ""
            } else {
                Object.value = eval(Object.value);
                if (Object.value == 0) {
                    Object.value = ""
                }
            }
        };
        this.InputBoxSelect = function () {
            if (typeof (jQuery) != "undefined") {
                $('body input[type="text"]').focus(function () {
                    $(this).select()
                }).mouseup(function (e) {
                    e.preventDefault()
                })
            }
        }
    };
    this.WindowResizeCrtl = new function () {
        this.WINDOW_WIDTH = $(window).width();
        this.WINDOW_HEIGHT = $(window).height();
        this.Implement = function (w, h) {
        }
    }
};
var pageculture = sportsSys.Common.GetCookie(AW_KENO_LANG_COOKIENAME);
$(function () {
    pgLoad.init();
    NewsList.marquee.spanObj = $("span[rel=span_NewsTitle]");
    vGlobalTimeObject = $("span[rel=spn_global_time]");
    window.setInterval(ChangeGlobalTime, 1000);
    window.setInterval(NewsList.bind, 60000);
    $("ul[data-id='ulselect'] > li > a, #ul_mybet_context_menu_single > li > a").off("click").on("click", function () {
        MainContentStateCheck($(this).data("val"))
    });
    $(window).resize(function () {
        var d = $(this);
        if (QuickBet.mode == true) {
            QuickBet.close()
        }
        $("html").PushMenu("updateSize");
        var c = "update";
        if (typeof ListOption !== "undefined" && ListOption.vlgame.data.checkIsVL(vCurrentSportCode) == true) {
            c = "height"
        }
        sportsSys.Common.CheckScrollbar($(".main-content-wrapper"), {state: c, height: $(window).height()});
        sportsSys.Common.CheckScrollbar($(".left-aside-inner"), {
            state: "update",
            height: $(window).height(),
            railColor: "none",
            size: "7px",
            color: "rgb(31, 31,31)"
        });
        sportsSys.Common.CheckScrollbar($(".right-aside-inner"), {
            state: "update",
            height: $(window).height(),
            size: "7px",
            color: "rgb(62, 62, 62)"
        });
        NewsList.close();
        Rule.obj.$div_pop_rules.center()
    });
    sportsSys.Common.CheckScrollbar($(".main-content-wrapper"), {state: "init", height: $(window).height()});
    sportsSys.Common.CheckScrollbar($(".left-aside-inner"), {
        state: "init",
        height: $(window).height(),
        railColor: "none",
        size: "7px",
        color: "rgb(31, 31, 31)"
    });
    sportsSys.Common.CheckScrollbar($(".right-aside-inner"), {
        state: "init",
        height: $(window).height(),
        size: "7px",
        color: "rgb(62, 62, 62)"
    });
    $(document).mouseup(function (g) {
        var c = $("#quickbet");
        if (!c.is(g.target) && c.has(g.target).length === 0) {
            c.hide()
        }
        var d = $("#tiptip_holder");
        if (!c.is(g.target) && d.has(g.target).length === 0) {
            d.hide()
        }
        var h = NewsList.Current.objNews;
        if (!h.is(g.target) && h.has(g.target).length === 0) {
            if (NewsList.Current.objNews.is(":hidden") == false) {
                NewsList.close()
            }
        }
        var f = $("#ol_eventcontent_message");
        if (!f.is(g.target) && f.has(g.target).length === 0) {
            f.hide()
        }
        if (Report.Obj.div_ShowResult != null && !Report.Obj.div_ShowResult.is(g.target) && Report.Obj.div_ShowResult.has(g.target).length === 0) {
            Report.Obj.div_ShowResult.html("");
            $.unblockUI()
        }
    }).bind("contextmenu", function (c) {
        c.preventDefault()
    }).bind("keypress keydown", function (f) {
        var c = f.target.tagName;
        if (f.which === 8 && c !== "INPUT" && c !== "TEXTAREA") {
            f.stopPropagation();
            f.preventDefault();
            return false
        }
        if (f.which == 13 || f.keyCode == 13) {
            var d = $(f.srcElement);
            if ((typeof d !== "undefined" && d.attr("rel") == "input_page_to") == false) {
                return false
            }
        }
    }).bind("click", function (f) {
        f = f || window.event;
        var g = f.target || f.srcElement;
        g = $(g);
        if (g.attr("id") == "a_quick_betin" || g.parent().attr("id") == "a_quick_betin") {
            PutBetToSport();
            return
        }
        var e = false;
        if (vCurrentPage == "detail" && g.is(".pre-match-title") == true) {
            EventContent.Effect.HeadSlide(g)
        } else {
            var h = (g[0].tagName.toLowerCase() == "a");
            if (h == false) {
                g = g.closest("a");
                h = (g.length > 0)
            }
            if (h == false) {
                g = null;
                h = null;
                return
            }
            if (g.is("[rel]") == true) {
                switch (g.attr("rel")) {
                    case"rel_Menu_main":
                        if (g[0].id == "a_menu_main_88888") {
                            FIFA.show();
                            FIFA.inplay.bind.get()
                        } else {
                            if (g[0].id == "a_menu_main_80001") {
                                Ti8.show();
                                Ti8.inplay.bind.get()
                            } else {
                                var c = g.next().find("a")[0];
                                var d = vCurrentSportCode == "" ? "00000" : vCurrentSportCode;
                                if (c.id.indexOf("a_menu_sub_" + d) == -1) {
                                    c.click()
                                }
                            }
                        }
                        break;
                    case"rel_Menu_sub":
                        SportsMenu.event.sub(g);
                        break;
                    case"rel_li_rate":
                        ListOption.RateEvent.betIn(g);
                        e = true;
                        break;
                    case"rel_a_event_detail":
                        ListOption.RateEvent.betInfo(g);
                        break
                }
            }
            h = null
        }
        e = (g.is(".btn-accept"));
        if (e == false) {
            $("#tiptip_holderbet").hide()
        }
        g = null
    }).idleTimeout({
        inactivity: 1000 * 60 * 180,
        sessionAlive: 1000 * 60 * 10,
        logout_url: "/Common/Logout.ashx?tpid=" + AW_SPORTS_THIRDPARTYCODE + "&gbcode=" + AW_GB_GAME_TYPE_CODE + "&ref=" + vrefer
    });
    switch (vwtpe) {
        case"1":
            $("#ul_mybet_context_menu_single").hide();
            $("#ul_mybet_context_menu").css("display", "");
            $("#account-bar").show();
            $("#aside-title-right").removeClass("aside-title-right-oneplat");
            $(".top-bar").removeClass("top-bar-oneplat");
            break;
        case"2":
            $("#ul_mybet_context_menu_single").css("display", "");
            $("#ul_mybet_context_menu").hide();
            $("#account-bar").hide();
            $("#aside-title-right").addClass("aside-title-right-oneplat");
            $(".top-bar").addClass("top-bar-oneplat");
            break;
        default:
            $("#ul_mybet_context_menu_single").hide();
            $("#ul_mybet_context_menu").css("display", "");
            $("#account-bar").show();
            $("#aside-title-right").removeClass("aside-title-right-oneplat");
            $(".top-bar").removeClass("top-bar-oneplat");
            break
    }
    $("#ul_livecate_template").on("click", "input", ListOption.BindLive.category.event.sportinput);
    ListOption.Templates.livecategory.divObj.on("click", "a[rel=livecate_confirm]", ListOption.BindLive.category.event.confirm).on("click", "a[rel=livecate_cancel]", ListOption.BindLive.category.event.cancel).on("click", "#livecat_tou_all", ListOption.BindLive.category.event.selAll).on("click", "a[rel=livecate_sport]", ListOption.BindLive.category.event.selSport).on("click", "input[name=livcate_sport_checked]", ListOption.BindLive.category.event.selAllBySport);
    ListOption.Templates.outrightcategory.divObj.on("click", "header a, footer a", ListOption.BindOutRight.category.event.button);
    ListOption.Templates.outrightcategory.divObj.on("click", "#input_outright_all", ListOption.BindOutRight.category.event.selAll);
    var a = function (d) {
        var c = $("input[name=input_outright_category]:checked").length;
        if (c == $("input[name=input_outright_category]").length) {
            $("#input_outright_all").attr("checked", true);
            ListOption.BindOutRight.category.isSelAll = true
        } else {
            $("#input_outright_all").attr("checked", false);
            ListOption.BindOutRight.category.isSelAll = false
        }
        c = null
    };
    $("#ul_outright_tour_template").on("click", "li", a);
    a = null;
    $("#div_sortType").on("click", "a", ListOption.SortTypeEvent);
    ListOption.Templates.livecategory.divTouObj.on("click", "ul input", ListOption.BindLive.category.event.selTouChecked);
    $("#sec_DateTime").on("click", "a", ListOption.BindPreMatch.Date.event);
    $("#ul_eventcontent_live_Cate_template").on("click", "a", EventContent.GpCate.event);
    $("#ul_dropList").on("click", "a", Report.event.dropList);
    $("#input_search").on("click", Report.event.Search);
    $("#div_topBarCtrl").on("click", "a", Report.event.topBarCtrl);
    $("#selSportCode").on("click", "a", Report.event.dlSportName);
    Report.Obj.div_Unsettled.on("click", "div[rel=rel_div_parlay]", Report.Unsettled.event.slideParlay);
    Report.Obj.div_Settled.on("click", "div[rel=rel_div_parlay]", Report.Settled.event.slideParlay);
    Report.Obj.div_Settled.on("click", "a[rel=rel_event_result]", Report.Settled.event.showResult);
    Report.ConductDatepicker();
    Report.Obj.div_Report.on("click", "#radio-3-report, #txtStartDate, #txtEndDate", Report.event.radioBtn);
    $("body").on("click", "a[rel=rel_a_redemption]", BetRedemption.event);
    FIFA.obj.$div_fifa_filter.on("click", "a[rel=rel_fifa_prematch_date]", FIFA.prematch.Date.event);
    FIFA.obj.$div_fifa_filter.on("click", "a[rel=rel_fifa_outright_cate]", FIFA.outright.category.event);
    FIFA.filter.obj.$a_group_filter_btn.on("click", FIFA.filter.event.filterBtn);
    FIFA.obj.$div_fifa_tab.on("click", "a", FIFA.Tab.event);
    FIFA.filter.obj.$div_group_filter.on("click", "input[type=checkbox]", FIFA.filter.event.changeValue).on("click", ".submit", FIFA.filter.event.confirm).on("click", ".delete-all", FIFA.filter.event.del).on("click", "label[gp=0],li[gp=1]", FIFA.filter.event.gpClick);
    $("#a_wc_banner").bind("click", FIFA.InplayBanner.event.show);
    $(Ti8.prematch.obj.div_ti8_prematch_template).on("click", "a[rel=rel_change_groupoption]", Ti8.prematch.event.changeGp);
    Ti8.obj.$div_ti8_tab.on("click", "a[rel=rel_tab_a]", Ti8.Tab.event);
    Ti8.obj.$div_ti8_date_cate.on("click", "a[rel=rel_ti8_prematch_date]", Ti8.prematch.Date.event);
    $("#div_ti8_info").on("click", "a", Ti8.prematch.standings.init);
    $("#div_ti8_info2").on("click", "a", Ti8.prematch.bracket.init)
});

function SetNoFlushData() {
    var a = $.jStorage.get("GB_QUICK_BET_INFO");
    $.jStorage.flush();
    if (a != null) {
        $.jStorage.set("GB_QUICK_BET_INFO", a)
    }
};