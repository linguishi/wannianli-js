
$(function () {
    var jieriArr = ['元旦','春节','清明','劳动','端午','中秋','国庆'];
    if (!!getQueryValue('quicklogininfo')) {
        var userinfo = JSON.parse(base64decode(getQueryValue('quicklogininfo')));
        var returnObj = {
            "AccessToken": userinfo.AccessToken,
            "ID": userinfo.ID,
            "RealName": userinfo.NickName
        }
        setCookie("userLocalData", JSON.stringify(returnObj), 3600 * 24, function() {
            location.replace(window.location.href.split('?')[0]);
        });
    } else if (!!getQueryValue('userinfo')){
        var userinfo = JSON.parse(base64decode(getQueryValue('userinfo')));
        // console.log(utf8to16(userinfo.nickname));
        var datastring = {"DataString" : "{\"OpenId\":\"" + userinfo.openid + "\",\"UnionId\":\""+ userinfo.unionid +"\",\"OpenName\":\"" + base64encode(utf16to8(utf8to16(userinfo.nickname)))+ "\",\"Icon \":\"" + userinfo.headimgurl + "\",\"Gender\":\"0\",\"Platform\":\"wx\"}"};
        $.ajax({
            url: 'http://u.51wnl.com/Login/OpenLogin?cid=Youloft_Android&av=4.2.6&mac=00:11:22:33:44:55&idfa=b622c089e7e14d2c2fa8c9129dafbb51&did=b622c089e7e14d2c2fa8c9129dafbb51&chn=wnl_anzhi&cc=CN&lang=zh&bd=com.youloft.calendar',
            data: datastring,
            dataType: 'json',
            type: 'POST',
            async: 'false',
            success: function(result) {
                // next 登录后操作
                var returnObj = {
                    "AccessToken": result.data.wnlToken,
                    "ID": result.data.wnlUserId,
                    "RealName": utf8to16(userinfo.nickname)
                };
                setCookie("userLocalData", JSON.stringify(returnObj), 3600 * 24, function(){
                    location.replace(window.location.href.split('?')[0]);
                });
            }
        });
    } else {
        $('body').removeClass('loadingHidden');
    }
    if (document.addEventListener) {
        document.addEventListener("touchstart", function () { }, true);
    }

    $('#quickloginiframe').attr('src', "//www.51wnl.com/webcalandar/wnl_login/indexapp.html?parenturl=" + encodeURIComponent(location.href) + "#/phonelogin");
    
    jQuery('input[placeholder]').placeholder();
    // 获取窗口高度
    var winHeight = 0;
    if (window.innerHeight) {
        winHeight = window.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        winHeight = document.documentElement.clientHeight;
    }
    var minHeight = winHeight > 672 ? winHeight : 672;
    var contentHeight = minHeight - $(".topBanner").height() - $(".footContent").height();
    var calendarHeight = contentHeight - $(".topContent").height() - $(".weekList").height();
    var minCalendarContentWidth = 1040, marginPercentage = 0.05, dayViewWidth = 277, contentMargin = 0;
    var $window = $(window), $calendarContent = $(".calendarContent"), $monthView = $(".monthView");

    windowResize();
    var resizeNum = 5;
    $window.on("resize", function(){
        _.debounce(windowResize(resizeNum), 1000, true);
    });

    function windowResize() {
        $('.expand.day').remove();
        var calWidth = $window.width() * (1 - marginPercentage * 2);
        $('.settingBtn').addClass('hidden');
        $('.spliteContent1').eq(0).addClass('hidden');
        if (calWidth > minCalendarContentWidth) {
            $calendarContent.width(calWidth);
            $monthView.width(calWidth - contentMargin - dayViewWidth - 3);
        }
        else {
            $calendarContent.width(minCalendarContentWidth);
            $monthView.width(minCalendarContentWidth - contentMargin - dayViewWidth - 3);
            $(".vacationContent .boxArrowTop").css("right", "30px");
            $(".jieqiContent .boxArrowTop").css("right", "110px");
        }
        if (window.innerHeight) {
            winHeight = window.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight) {
            winHeight = document.documentElement.clientHeight;
        }
        var minHeight = winHeight > 672 ? winHeight : 672;
        var contentHeight = minHeight - $(".topBanner").height() - $(".footContent").height();
        $('.calendarContent').height(contentHeight);
        $('.dayView').height(contentHeight);
        var calendarHeight = contentHeight - $(".topContent").height() - $(".weekList").height();
        $(".dayInfoContent").height(contentHeight - 50);
        $(".remindList").height($(".monthContent").height() - 40 * 2);
        $(".dayViewYiDescContent").width($(".yiViewContent").width() - 50);
        $(".dayViewJiDescContent").width($(".jiViewContent").width() - 50);
        setTimeout(function(){
            $(".dayContent").height(Math.floor((calendarHeight - ( 4 * $(".monthDayList").height() / $(".day").height())) / ($(".monthDayList").height() / $(".day").height())));
            $('.day').height($('.dayContent').css('height'));
        }, 100);
    }

    //配置的全局各个年份的黄历宜忌
    var yijiInfoList = { 2008: null, 2009: null, 2010: null, 2011: null, 2012: null, 2013: null, 2014: null, 2015: null, 2016: null, 2017: null, 2018: null };
    //全局各个年份的黄历信息
    var huangliInfoList = { 2010: null, 2011: null, 2012: null, 2013: null, 2014: null, 2015: null, 2016: null, 2017: null, 2018: null, 2019: null, 2020: null, 2021: null, 2022: null, 2023: null, 2024: null, 2025: null };
    var weekListString = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var localReminderList = null;

    var accessToken, userid;
    var clientName = "YouLoft.cnCalendar.Web";
    var loginURL = "/api/signin_v2.ashx";
    var forgetURL = "/handers/ResetpasswordHandler.ashx";
    //var registerURL="/api/signup.ashx";
    var registerURL = "/Handers/SignUpHandler.ashx";
    var changePwdURL = "/Handers/ChangePasswordHandlerNew.ashx";
    var changeEmailURL = "/Handers/updateEmailHandler.ashx";
    var getOldEmailUrl = "/Handers/GetOldEmail.ashx";
    var downloadDataURL = "//www.51wnl.com/api2/downloaddata.aspx";
    var uploadDataUrl = "/api2/uploaddata.aspx";
    var userLocalData = getCookie("userLocalData") ? JSON.parse(getCookie("userLocalData")) : null;
    if (userLocalData === null && getCookie("AccessToken")) {
        userLocalData = {
            "AccessToken": getCookie("AccessToken"),
            "ID": getCookie("Nickname") ? decodeURIComponent(getCookie("Nickname")) : getCookie("Name")
        }
    }

    var dateCurrent = new Date();
    $(".monthDayList .day").detach();

    var vacationUrl = "//cfg.51wnl.com/api/getconfigbyparajson.aspx?appid=ios-wnl-free&appver=2&configkey=Vocation_ZH_CN&lastupdate=";
    var festivalUrl = "//cfg.51wnl.com/api/getconfigbyparajson.aspx?appid=ios-wnl-free&appver=2&configkey=Festival_ZH_CN&lastupdate=";
    var vacationFestivalData = {}, vacationData, festivalData;
    $.ajax({
        url: vacationUrl,
        dataType: "jsonp",
        jsonp: "callback",
        async: false,
        success: function (result) {
            if (result.status) {
                vacationFestivalData.vacationData = base64decode(result.msg);
                vacationFestivalData.lastupdate = result.r;
                vacationData = JSON.parse(vacationFestivalData.vacationData);
            }
            $.ajax({
                url: festivalUrl,
                dataType: "jsonp",
                jsonp: "callback",
                async: false,
                success: function (result) {
                    if (result.status) {
                        vacationFestivalData.festivalData = utf8to16(base64decode(result.msg));
                        vacationFestivalData.lastupdate = result.r;
                        festivalData = JSON.parse(vacationFestivalData.festivalData);
                        // console.log(festivalData);
                    }
                    createMonthDayList(dateCurrent);
                    if (userLocalData) {
                        accessToken = userLocalData.AccessToken;
                        userid = userLocalData.ID;
                        $(".username").html("欢迎您 " + userid);
                        if(userLocalData.RealName){
                            $(".username").html("欢迎您 " + userLocalData.RealName);
                        }
                        $(".userLogoutContent").removeClass("hidden");
                        if(getCookie('HasSetPwd') && false) {
                            $('.settingBtn').addClass('hidden');
                            $('.spliteContent1').eq(0).addClass('hidden');
                        }
                        getReminderList(accessToken, clientName, dateCurrent);
                        $(".spliteContent").addClass("hidden");
                    }
                    else {
                        $(".userLoginContent").removeClass("hidden");
                        $(".remindBtn").removeClass("active");
                        $(".dayViewBtn").addClass("active");
                        $(".remindContent").addClass("hidden");
                        $(".dayInfoContent").removeClass("hidden");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //alert("数据加载异常，请清除浏览器缓存后重试");
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("数据加载异常，请清除浏览器缓存后重试");
        }
    });
    var yearNow = dateCurrent.getFullYear();
    var monthNow = dateCurrent.getMonth();
    var dayNow = dateCurrent.getDate();
    $(".dateTxt").html(yearNow + "年" + (monthNow + 1) + "月");
    $(".logoutBtn").click(function () {
        if (confirm("确定退出吗?")) {
            localReminderList = null;
            $(".userLoginContent").removeClass("hidden");
            $(".userLogoutContent").addClass("hidden");
            setCookie("userLocalData",'');
            userLocalData = null;
            if (!!getCookie("AccessToken")) {
                setCookie("AccessToken",'');
            }
            if (!!getCookie("Name")) {
                setCookie("Name",'');
            }
            if (!!getCookie("Nickname")) {
                setCookie("Nickname",'');
            }
            $(".spliteContent").removeClass("hidden");
            $(".remindBtn").removeClass("active");
            $(".dayViewBtn").addClass("active");
            $(".remindContent").addClass("hidden");
            $(".dayInfoContent").removeClass("hidden");

            $(".dayViewYiDescContent").width($(".yiViewContent").width() - 50);
            $(".dayViewJiDescContent").width($(".jiViewContent").width() - 50);
            $(".dayRemindContent").remove();
            $(".remindList").empty();
            $(".pwdTxt").val("");
            $('.dayViewBtn').trigger('click');
            $('.dayRemindListAfter').remove();

            window.location.reload();
        }
    });

    $(".registerBtn").click(function () {
        $(".registerUsernameTip").html("");
        $(".usernameErrorDesc").html("");
        $(".registerPwdTip").html("");
        $(".pwdErrorDesc").html("");
        $(".registerConfirmPwdTip").html("");
        $(".confirmPwdErrorDesc").html("");
        $(".emailTip").html("");
        $(".emailErrorDesc").html("");
        $(".validateCodeErrorDesc").html("");
        $(".registerUsernameTxt").val("");
        $(".registerPwdTxt").val("");
        $(".registerConfirmPwdTxt").val("");
        $(".emailTxt").val("");
        $(".validateCodeTxt").val("");
        //todo 验证码url
        $(".registerValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
        $(".registerContent").removeClass("hidden");
    });
    $(".registerUsernameTxt").focus(function () {
        $(".registerUsernameTip").html("");
        $(".usernameErrorDesc").html("");
    });
    $(".registerUsernameTxt").blur(function () {
        var usernameReg = /^[a-zA-Z]\w*$/;
        var username = $.trim($(".registerUsernameTxt").val());
        if (username.length == 0 || username.length > 16 || username.length < 5 || !usernameReg.test(username)) {
            $(".registerUsernameTip").html("用户名不可用");
            $(".usernameErrorDesc").html("用户名长度在5至16之间,必需以字母开头,只能包括字母、数字或者下划线");
        }
    });
    $(".registerPwdTxt").focus(function () {
        $(".registerPwdTip").html("");
        $(".pwdErrorDesc").html("");
    });
    $(".registerPwdTxt").blur(function () {
        var pwd = $.trim($(".registerPwdTxt").val());
        if (pwd.length == 0 || pwd.length > 16) {
            $(".registerPwdTip").html("密码不可用");
            $(".pwdErrorDesc").html("密码不能为空,且长度不能大于16");
        }
    });
    $(".registerConfirmPwdTxt").focus(function () {
        $(".registerConfirmPwdTip").html("");
        $(".confirmPwdErrorDesc").html("");
    });
    $(".registerConfirmPwdTxt").blur(function () {
        var pwd = $.trim($(".registerPwdTxt").val());
        var confirmPwd = $.trim($(".registerConfirmPwdTxt").val());
        if (confirmPwd.length === 0 || confirmPwd !== pwd) {
            $(".registerConfirmPwdTip").html("密码不一致");
            $(".confirmPwdErrorDesc").html("请输入一致的密码");
        }
    });
    $(".emailTxt").focus(function () {
        $(".emailTip").html("");
        $(".emailErrorDesc").html("");
    });
    $(".emailTxt").blur(function () {
        var email = $.trim($(".emailTxt").val());
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (email.length == 0 || !emailReg.test(email)) {
            $(".emailTip").html("邮箱不可用");
            $(".emailErrorDesc").html("请输入正确的邮箱");
        }
    });
    $(".validateCodeTxt").focus(function () {
        $(".validateCodeErrorDesc").html("");
    });
    $(".validateCodeTxt").blur(function () {
        var validateNumber = $.trim($(".validateCodeTxt").val());
        if (validateNumber.length === 0) {
            $(".validateCodeErrorDesc").html("请输入验证码");
        }
    });
    $(".registerCancleBtn").click(function () {
        $(".registerContent").addClass("hidden");
    });
    $('.chooseWechatLogin').click(function(){
        $('.chooseQuickLogin').removeClass('active');
        $('.chooseWechatLogin').addClass('active');
        $('.quickLoginContainer').addClass('hidden');
        $('.wechatLoginContainer').removeClass('hidden');
    })
    $('.chooseQuickLogin').click(function(){
        setPicVerify('.quickValidateImg');
        $('.chooseWechatLogin').removeClass('active');
        $('.chooseQuickLogin').addClass('active');
        $('.wechatLoginContainer').addClass('hidden');
        $('.quickLoginContainer').removeClass('hidden');
    })
    $('.backToQuickLogin').click(function(){
        $('.loginContent').addClass('hidden');
        $(".usernameTxt").val("");
        $(".pwdTxt").val("");
        $(".pwdTip").html("");
        $(".usernameTip").html("");
        $(".loginErrorDesc").html("");
        //todo 验证码图片修改
        if(typeof ie === "number" && ie < 9){
            $('.contentMask').Trigger('click');
        }
        $('.quickLoginContent').removeClass('hidden');
        $('.chooseWechatLogin').removeClass('active');
        $('.chooseQuickLogin').addClass('active');
        $('.wechatLoginContainer').addClass('hidden');
        $('.quickLoginContainer').removeClass('hidden');
    });
    $(".registerValidateImg").click(function () {
        //todo 验证码图片修改
        $(this).attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
    });
    $(".registerConfirmBtn").click(function () {
        var usernameReg = /^[a-zA-Z]\w*$/;
        var username = $.trim($(".registerUsernameTxt").val());
        if (username.length == 0 || username.length > 16 || username.length < 5 || !usernameReg.test(username)) {
            $(".registerUsernameTip").html("用户名不可用");
            $(".usernameErrorDesc").html("用户名长度在5至16之间,必需以字母开头,只能包括字母、数字或者下划线");
            return false;
        }
        var pwd = $.trim($(".registerPwdTxt").val());
        if (pwd.length == 0 || pwd.length > 16) {
            $(".registerPwdTip").html("密码不可用");
            $(".pwdErrorDesc").html("密码不能为空,且长度不能大于16");
            return false;
        }
        var confirmPwd = $.trim($(".registerConfirmPwdTxt").val());
        if (confirmPwd.length === 0 || confirmPwd != pwd) {
            $(".registerConfirmPwdTip").html("密码不一致");
            $(".confirmPwdErrorDesc").html("请输入一致的密码");
            return false;
        }
        var email = $.trim($(".emailTxt").val());
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (email.length == 0 || !emailReg.test(email)) {
            $(".emailTip").html("邮箱不可用");
            $(".emailErrorDesc").html("请输入正确的邮箱");
            return false;
        }
        var validateNumber = $.trim($(".validateCodeTxt").val());
        if (validateNumber.length === 0) {
            $(".validateCodeErrorDesc").html("请输入验证码");
            return false;
        }
        $.ajax({
            url: registerURL,
            type: "POST",
            //headers: {
            //   "ClientName":clientName
            //},
            //beforeSend: function (request)
            //{
            //   request.setRequestHeader("ClientName", clientName);
            //},
            //data:{uName:username,uPsw:confirmPwd,uEmail:email},
            data: { regName: username, regPsw: confirmPwd, regEmail: email, ValidateNumber: validateNumber },
            success: function (result) {
                //todo 验证码url
                $(".registerValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
                if (result === "0") {
                    alert("注册成功,请登录");
                    $(".registerContent").addClass("hidden");
                }
                else if (result === "1") {
                    $(".validateCodeErrorDesc").html("用户名已被使用,请重新输入");
                }
                else if (result === "2") {
                    $(".validateCodeErrorDesc").html("邮箱已被使用,请重新输入");
                }
                else if (result === "4") {
                    $(".validateCodeErrorDesc").html("验证码错误,请重试");
                }
                else {
                    $(".validateCodeErrorDesc").html("服务器异常,请重试");
                }
            },
            error: function (xhr, status, errorMsg) {
                $(".validateCodeErrorDesc").html("服务器异常,请重试");
            }
        })
    });
    $(".userCenterLoginBtn").click(function(){
        $('.quickLoginContent').addClass('hidden');
        $(".usernameTxt").val("");
        $(".pwdTxt").val("");
        $(".pwdTip").html("");
        $(".usernameTip").html("");
        $(".loginErrorDesc").html("");
        //todo 验证码图片修改
        $(".forgetValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
        $(".loginContent").removeClass("hidden");
        $(".loginMainContent").removeClass("hidden");
        $(".forgetContent").addClass("hidden");
        $(".usernameTxt").focus();
    })
    $('.getMessageCode').click(function() {
        if ($(this).hasClass('count')) {
            return false;
        }
        var phone = $('#quickLoginPhoneNumber').val().trim().replace(/\s/g, '');
        if (phone.length !== 11 || !/^1[34578]\d{9}$/.test(phone)) {
            setTimeout(function() {
                drawToast('请正确输入手机号');
            }, 0);
            return false;
        }
        var imgCode = $('#quickValidateCodeTxt').val().trim();
        if (imgCode.length === 0) {
            setTimeout(function() {
                drawToast('请输入正确验证码,点击图片刷新');
            }, 0);
            return false;
        }
        code_type = 'phoneLogin';
        getVerifyCode(phone, 3, imgCode);
    });
    $(".loginBtn").click(function () {
        if(typeof ie === "number" && ie < 9){
            $('.userCenterLoginBtn').trigger('click');
            $('.backToQuickLogin').addClass('hidden');
            return;
        }
        $(".usernameTxt").val("");
        $(".pwdTxt").val("");
        $(".pwdTip").html("");
        $(".usernameTip").html("");
        $(".loginErrorDesc").html("");
        //todo 验证码图片修改
        setPicVerify('.quickValidateImg');
        $(".forgetValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
        $(".quickLoginContent").removeClass("hidden");
        $(".loginMainContent").removeClass("hidden");
        $(".forgetContent").addClass("hidden");
        $(".usernameTxt").focus();
    });
    $(".usernameTxt").focus(function () {
        $(".usernameTip").html("");
    });
    $(".pwdTxt").focus(function () {
        $(".pwdTip").html("");
    });
    $(".pwdTxt").on("keydown", function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            loginPost();
            return false;
        }
    });
    $(".loginConfirmBtn").click(function () {
        loginPost();
    });
    $('.phoneLoginContent .phoneLoginBnt').click(function() {
        if ($(this).hasClass('disable')) {
            return false;
        }
        var phone = $('.phoneLoginContent #phoneTxt').val().trim().replace(/\s/g, '');
        if (phone.length !== 11 || !/^1[34578]\d{9}$/.test(phone)) {
            setTimeout(function() {
                drawToast('请正确输入手机号');
            }, 0);
            return false;
        }
        var imgCode = $('.phoneLoginContent .verifyDTxt').val().trim();
        if (imgCode.length === 0) {
            setTimeout(function() {
                drawToast('请输入正确的短信验证码');
            }, 0);
            return false;
        }
        phoneLoginAfterCode(phone, imgCode);
    });

    function phoneLoginAfterCode(phone, code) {
        $('.mask').removeClass('hidden');
        $('.mask .loginTxt').html('登录中...');
        var dataString = {
            'DataString': JSON.stringify({
                'Phone': phone,
                'Code': code
            })
        };
        $.ajax({
            url: httpProtocol + '//u.51wnl.com/PhoneLogin?old=true',
            type: 'POST',
            dataType: 'json',
            data: dataString,
            success: function(result) {
                $('.mask').addClass('hidden');
                if (result.Status !== 200) {
                    setTimeout(function() {
                        drawToast('服务器错误,请重试');
                    }, 0);
                    return;
                }
                if (result.Data.Result === 1) {
                    if (result.Data.UserInfo.HasSetPassword) {
                        setTimeout(function() {
                            drawToast('登录成功');
                        }, 0);
                        if (isWnl) {
                            setTimeout(function() {
                                // alert('protocol://auth' + protocal_prefix + encodeURI(JSON.stringify(result.Data.UserInfo)));
                                location.href = 'protocol://auth' + protocal_prefix + encodeURI(JSON.stringify(result.Data.UserInfo));
                            }, 250);
                        }
                        if (returl) {
                            var UserInfo = {
                                ID: result.Data.UserInfo.ID,
                                AccessToken: result.Data.UserInfo.AccessToken,
                                HasSetPassword: result.Data.UserInfo.HasSetPassword,
                                IsOtherLogin: result.Data.UserInfo.IsOtherLogin
                            };
                            localStorage.setItem('local_userinfo',JSON.stringify(UserInfo));
                            setTimeout(function() {
                                window.close();
                            }, 500);
                        }
                    }
                    else {
                        router.redirect('#/phoneregisterpwd/' + phone + '/0');
                    }
                }
                else if (result.Data.Result === 104) {
                    router.redirect('#/phoneregisterpwd/' + phone + '/0');
                }
                else if (result.Data.Result === 402) {
                    setTimeout(function() {
                        drawToast('请正确输入验证码');
                    }, 0);
                    return false;
                }
                else {
                    setTimeout(function() {
                        drawToast('登录失败');
                    }, 0);
                }
            },
            error: function(xhr, status, errorMsg) {
                $('.mask').addClass('hidden');
                setTimeout(function() {
                    drawToast('服务器错误,请重试');
                }, 0);
            }
        });
    }
    function loginPost() {
        var username = $.trim($(".usernameTxt").val());
        if (username.length === 0) {
            $(".usernameTip").html("请输入用户名");
            return false;
        }
        var pwd = $.trim($(".pwdTxt").val());
        if (pwd.length === 0) {
            $(".pwdTip").html("请输入密码");
            return false;
        }
        pwd = CryptoJS.MD5(pwd) + "";
        $.ajax({
            url: loginURL,
            type: "POST",
            headers: {
                "ClientName": clientName
            },
            beforeSend: function (request) {
                request.setRequestHeader("ClientName", clientName);
            },
            data: { uName: username, uPsw: pwd },
            success: function (result) {
                result = $.parseJSON(result);
                if (result.is_Succeed == 1) {
                    //登陆完成
                    var returnObj = {
                        "AccessToken": result.error.AccessToken,
                        "ID": result.error.ID,
                        "RealName": result.error.RealName
                    };
                    setCookie("userLocalData", JSON.stringify(returnObj), 3600 * 24);
                    $(".loginContent").addClass("hidden");
                    $(".userLoginContent").addClass("hidden");
                    userid = returnObj.ID;
                    $(".username").html("欢迎您 " + userid);
                    if(userLocalData && userLocalData.RealName){
                        $(".username").html("欢迎您 " + userLocalData.RealName);
                    }
                    $(".userLogoutContent").removeClass("hidden");
                    if(getCookie('HasSetPwd') && false) {
                        $('.settingBtn').addClass('hidden');
                        $('.spliteContent1').eq(0).addClass('hidden');
                    }
                    accessToken = returnObj.AccessToken;
                    userLocalData = {};
                    userLocalData.AccessToken = accessToken;
                    userLocalData.ID = userid;
                    getReminderList(accessToken, clientName, dateCurrent);
                    $(".spliteContent").addClass("hidden");
                    $(".remindBtn").removeClass("hidden");
                }
                else {
                    $(".loginErrorDesc").html(result.error);
                }
            },
            error: function (xhr, status, errorMsg) {
                alert("服务器错误,请重试");
            }
        })
    }
    $(".forgetAccountBnt").click(function () {
        $(".forgetErrorDesc").html("");
        $(".loginMainContent").addClass("hidden");
        $(".forgetContent").removeClass("hidden");
    });
    $(".loginAccountBnt").click(function () {
        $(".loginMainContent").removeClass("hidden");
        $(".forgetContent").addClass("hidden");
    });
    $(".forgetValidateImg").click(function () {
        //todo 验证码图片修改
        //$(this).attr("src","http://www.51wnl.com/JpegImage.aspx?client=1&date="+Math.random());
        $(this).attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
    });
    $(".forgetConfirmBtn").click(function () {
        var email = $.trim($(".forgetEmailTxt").val());
        if (email.length == 0) {
            $(".forgetErrorDesc").html("请输入邮箱");
            return false;
        }
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emailReg.test(email)) {
            $(".forgetErrorDesc").html("请输入正确的邮箱");
            return false;
        }
        var verifyCode = $.trim($(".forgetValidateCodeTxt").val());
        if (verifyCode.length == 0) {
            $(".forgetErrorDesc").html("请输入验证码");
            return false;
        }
        $.ajax({
            url: forgetURL,
            type: "POST",
            data: {
                type: "0",
                email: email,
                validatecode: verifyCode
            },
            success: function (result) {
                //忘记密码完成
                $(".forgetErrorDesc").html(result);
                //todo 验证码图片修改
                $(".forgetValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1");
            },
            error: function (xhr, status, errorMsg) {
                $(".forgetErrorDesc").html("服务器错误,请重试");
            }
        })
    });
    $(".settingBtn").click(function () {
        $(".settingChooseContent a").removeClass("active");
        $(".changePwdBtn").addClass("active");
        $(".changePwdContent").removeClass("hidden");
        $(".changeEmailContent").addClass("hidden");
        $(".newEmailTxt").val("");
        $(".newEmailValidateCodeTxt").val("");
        $(".changeEmailErrorDesc").html("");
        //todo 验证码图片修改
        //$(this).attr("src","http://www.51wnl.com/JpegImage.aspx?client=1&date="+Math.random());
        $(".changePwdValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
        $(".oldPwdTxt").val("");
        $(".newPwdTxt").val("");
        $(".confirmNewPwdTxt").val("");
        $(".changePwdValidateCodeTxt").val("");
        $(".changePwdErrorDesc").html("");
        $(".settingContent").removeClass("hidden");
    });
    $(".changePwdCancleBtn").click(function () {
        $(".settingContent").addClass("hidden");
    });
    $(".changePwdValidateImg").click(function () {
        //todo 验证码图片修改
        $(this).attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
    });
    $(".changePwdConfirmBtn").click(function () {
        var oldPwd = $.trim($(".oldPwdTxt").val());
        if (oldPwd.length === 0) {
            $(".changePwdErrorDesc").html("请输入旧密码");
            return false;
        }
        var newPwd = $.trim($(".newPwdTxt").val());
        if (newPwd.length === 0) {
            $(".changePwdErrorDesc").html("请输入新密码");
            return false;
        }
        var confirmNewPwd = $.trim($(".confirmNewPwdTxt").val());
        if (confirmNewPwd.length === 0 || confirmNewPwd !== newPwd) {
            $(".changePwdErrorDesc").html("请确认新密码");
            return false;
        }
        var changePwdValidateCode = $.trim($(".changePwdValidateCodeTxt").val());
        if (changePwdValidateCode.length === 0) {
            $(".changePwdErrorDesc").html("请输入验证码");
            return false;
        }
        $.ajax({
            url: changePwdURL,
            type: "POST",
            data: {
                newPsw: newPwd,
                oldPsw: oldPwd,
                accesstoken: userLocalData.AccessToken,
                validate: changePwdValidateCode
            },
            success: function (result) {
                switch (parseInt(result)) {
                    case 0:
                        $(".changePwdErrorDesc").html("验证码输入错误");
                        break;
                    case 1:
                        $(".changePwdErrorDesc").html("请登录后操作");
                        break;
                    case 2:
                        $(".changePwdErrorDesc").html("发生错误,请检查输入");
                        break;
                    case 3:
                        $(".changePwdErrorDesc").html("发生错误,请检查输入");
                        break;
                    case 99:
                        $(".changePwdErrorDesc").html("修改成功");
                        break;
                }
                //todo 验证码图片修改
                $(".changePwdValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
            },
            error: function (xhr, status, errorMsg) {
                $(".forgetErrorDesc").html("服务器错误,请重试");
            }
        })
    });
    $(".changePwdBtn").click(function () {
        $(".settingChooseContent a").removeClass("active");
        $(this).addClass("active");
        $(".oldPwdTxt").val("");
        $(".newPwdTxt").val("");
        $(".confirmNewPwdTxt").val("");
        $(".changePwdValidateCodeTxt").val("");
        $(".changePwdErrorDesc").html("");
        //todo 验证码图片修改
        $(".changePwdValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
        $(".changePwdContent").removeClass("hidden");
        $(".changeEmailContent").addClass("hidden");
    });
    $(".changeEmailBtn").click(function () {
        $(".settingChooseContent a").removeClass("active");
        $(this).addClass("active");
        $(".newEmailTxt").val("");
        $(".newEmailValidateCodeTxt").val("");
        $(".changeEmailErrorDesc").html("");
        //todo 验证码图片修改
        $(".newEmailValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
        $.ajax({
            url: getOldEmailUrl,
            type: "POST",
            data: {
                accesstoken: userLocalData.AccessToken
            },
            success: function (result) {
                if (result.length === 0) {
                    $(".oldEmail").html("无");
                }
                else {
                    $(".oldEmail").html(result);
                }
            },
            error: function (xhr, status, errorMsg) {

            }
        });
        $(".changePwdContent").addClass("hidden");
        $(".changeEmailContent").removeClass("hidden");
    });
    $(".newEmailValidateImg").click(function () {
        //todo 验证码图片修改
        $(this).attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
    });
    $(".changeEmailCancleBtn").click(function () {
        $(".settingContent").addClass("hidden");
    });
    $(".changeEmailConfirmBtn").click(function () {
        var email = $.trim($(".newEmailTxt").val());
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (email.length == 0 || !emailReg.test(email)) {
            $(".changeEmailErrorDesc").html("请输入正确的邮箱");
            return false;
        }
        var newEmailValidateCode = $.trim($(".newEmailValidateCodeTxt").val());
        if (newEmailValidateCode.length === 0) {
            $(".newEmailValidateCodeTxt").html("请输入验证码");
            return false;
        }
        $.ajax({
            url: changeEmailURL,
            type: "POST",
            data: {
                email: email,
                validate: newEmailValidateCode,
                accesstoken: userLocalData.AccessToken
            },
            success: function (result) {
                switch (parseInt(result)) {
                    case 0:
                        $(".changeEmailErrorDesc").html("验证码输入错误");
                        break;
                    case 1:
                        $(".changeEmailErrorDesc").html("邮箱地址不正确");
                        break;
                    case 2:
                        $(".changeEmailErrorDesc").html("请登录后再操作");
                        break;
                    case 4:
                        $(".changeEmailErrorDesc").html("邮箱已被使用");
                        break;
                    case 3:
                        $(".changeEmailErrorDesc").html("发生错误,请检查输入");
                        break;
                    case 99:
                        $(".changeEmailErrorDesc").html("修改成功");
                        break;
                }
                //todo 验证码图片修改
                $(".newEmailValidateImg").attr("src", "http://www.51wnl.com/JpegImage.aspx?client=1&date=" + Math.random());
            },
            error: function (xhr, status, errorMsg) {
                $(".forgetErrorDesc").html("服务器错误,请重试");
            }
        })
    });

    function getReminderList(AccessToken, ClientName, currentSelectedDate, keyword) {
        if (!localReminderList) {
            $.ajax({
                url: downloadDataURL,
                type: "POST",
                headers: {
                    "AccessToken": AccessToken,
                    "ClientName": ClientName
                },
                beforeSend: function (request) {
                    request.setRequestHeader("AccessToken", AccessToken);
                    request.setRequestHeader("ClientName", ClientName);
                },
                data: { lastupdate: "", type: "0" },
                success: function (result) {
                    result = $.parseJSON(result);
                    var status = parseInt(result.status);
                    if (status === 0) {
                        if (result.msg.length === 0) {
                            return;
                        }
                        localReminderList = result.msg.sort(function (a, b) {
                            if (parseInt(a.createdate) === parseInt(b.createdate)) {
                                return 0;
                            }
                            else if (parseInt(a.createdate) > parseInt(b.createdate)) {
                                return 1;
                            }
                            else if (parseInt(a.createdate) < parseInt(b.createdate)) {
                                return -1;
                            }
                        });
                        if (currentSelectedDate) {
                            getMonthReminds(currentSelectedDate);
                            if (keyword) {
                                getListReminds(currentSelectedDate, keyword);
                            }
                            else {
                                getListReminds(currentSelectedDate);
                            }
                        }
                    }
                    //else if(status===1){
                    //   alert("参数错误,请重试")
                    //}
                    //else if(status===2){
                    //   alert("授权错误,请重试")
                    //}
                    //else if(status===3){
                    //   alert("同步查询出错,请重试")
                    //}
                },
                error: function (xhr, status, errorMsg) {
                    alert("服务器错误,请重试");
                }
            })
        }
        else {
            if (currentSelectedDate) {
                getMonthReminds(currentSelectedDate);
                if (keyword) {
                    getListReminds(currentSelectedDate, keyword);
                }
                else {
                    getListReminds(currentSelectedDate);
                }
            }

        }
    }
    function getMonthReminds(currentSelectedDate) {
        var currentYear = currentSelectedDate.getFullYear(), currentMonth = currentSelectedDate.getMonth();
        var monthDayCount = (new Date(currentYear, currentMonth + 1, 0).getDate());
        for (var i = 1; i <= monthDayCount; i++) {
            var dayRemindList = [];
            var dayDate = new Date(currentYear, currentMonth, i);
            var indexNow;
            var $indexNow;
            for (var j = 0; j < localReminderList.length; j++) {
                var startDate = getLocalTime(localReminderList[j].tdatetime);
                var startYear = startDate.getFullYear(), startMonth = startDate.getMonth(), startDay = startDate.getDate();
                startDate = new Date(startYear, startMonth, startDay);
                if (localReminderList[j].status === 2 || dayDate < startDate) {
                    continue;
                }
                if (currentYear === startYear && currentMonth === startMonth && i === startDay) {
                    dayRemindList.push(localReminderList[j]);
                    continue;
                }
                var repeattype = localReminderList[j].repeattype, datetype = localReminderList[j].datetype;
                var lunarStartDate = new Lunar(startDate);
                var lunarCurrentDate = new Lunar(dayDate);
                var lMonthDayCount = 0;
                if (repeattype === 0) {
                    if (currentYear === startYear && currentMonth === startMonth && i === startDay) {
                        dayRemindList.push(localReminderList[j]);
                    }
                }
                else if (repeattype === 1000) {
                    if (datetype === 1) {
                        if (lunarStartDate.isLeap) {
                            if (lunarCurrentDate.isLeap) {
                                lMonthDayCount = leapDays(lunarCurrentDate.year);
                                if ((leapMonth(lunarStartDate.year) === leapMonth(lunarCurrentDate.year) && lunarStartDate.day === lunarCurrentDate.day) ||
                                    (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                    dayRemindList.push(localReminderList[j]);
                                }
                            }
                            else {
                                lMonthDayCount = monthDays(lunarCurrentDate.year, lunarCurrentDate.month);
                                if ((leapMonth(lunarStartDate.year) === lunarCurrentDate.month && lunarStartDate.day === lunarCurrentDate.day) ||
                                    (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                    dayRemindList.push(localReminderList[j]);
                                }
                            }
                        }
                        else {
                            lMonthDayCount = monthDays(lunarCurrentDate.year, lunarCurrentDate.month);
                            if ((lunarStartDate.month === lunarCurrentDate.month && lunarStartDate.day === lunarCurrentDate.day) ||
                                (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                dayRemindList.push(localReminderList[j]);
                            }
                        }
                    }
                    else {
                        if ((startMonth === currentMonth && i === startDay) || (i === monthDayCount && startDay > i && startMonth === currentMonth)) {
                            dayRemindList.push(localReminderList[j]);
                        }
                    }
                }
                else if (repeattype > 2000 && repeattype < 3000) {
                    if ((startYear * 12 + startMonth - (currentYear * 12 + currentMonth)) % (repeattype - 2000) === 0) {
                        if (datetype === 1) {
                            if (lunarStartDate.isLeap) {
                                if (lunarCurrentDate.isLeap) {
                                    lMonthDayCount = leapDays(lunarCurrentDate.year);
                                    if ((lunarStartDate.day === lunarCurrentDate.day) ||
                                        (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                        dayRemindList.push(localReminderList[j]);
                                    }
                                }
                                else {
                                    lMonthDayCount = monthDays(lunarCurrentDate.year, lunarCurrentDate.month);
                                    if ((lunarStartDate.day === lunarCurrentDate.day) ||
                                        (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                        dayRemindList.push(localReminderList[j]);
                                    }
                                }
                            }
                            else {
                                lMonthDayCount = monthDays(lunarCurrentDate.year, lunarCurrentDate.month);
                                if ((lunarStartDate.day === lunarCurrentDate.day) ||
                                    (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                    dayRemindList.push(localReminderList[j]);
                                }
                            }
                        }
                        else {
                            if ((i === startDay) || (i === monthDayCount && startDay > i)) {
                                dayRemindList.push(localReminderList[j]);
                            }
                        }
                    }
                }
                else if (repeattype > 3000 && repeattype < 4000) {
                    var iDays = parseInt(Math.abs(dayDate - startDate) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数
                    if (iDays % (repeattype - 3000) === 0) {
                        dayRemindList.push(localReminderList[j]);
                    }
                }
                else {
                    var weekTag = Math.pow(2, dayDate.getDay());
                    if (((repeattype - 4000) & weekTag) === weekTag) {
                        dayRemindList.push(localReminderList[j]);
                    }
                }
            }
            dayRemindList = dayRemindList.sort(function (a, b) {
                if (a.isallday && !b.isallday) {
                    return -1;
                }
                else if (!a.isallday && b.isallday) {
                    return 1;
                }
                else if (a.isallday && b.isallday) {
                    var aDate = getLocalTime(a.createdate), bDate = getLocalTime(b.createdate);
                    var aTime = aDate.getHours() * 3600 + aDate.getMinutes() * 60;
                    var bTime = bDate.getHours() * 3600 + bDate.getMinutes() * 60;
                    if (aTime > bTime) {
                        return 1;
                    }
                    else if (aTime < bTime) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
                else if (!a.isallday && !b.isallday) {
                    var aDate = getLocalTime(a.tdatetime), bDate = getLocalTime(b.tdatetime);
                    var aTime = aDate.getHours() * 3600 + aDate.getMinutes() * 60;
                    var bTime = bDate.getHours() * 3600 + bDate.getMinutes() * 60;
                    if (aTime > bTime) {
                        return 1;
                    }
                    else if (aTime < bTime) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            });
            $indexNow = $(".now:eq(" + (i - 1) + ")");
            $indexNow.find(".dayRemindContent").remove();
            for (var m = 0; m < dayRemindList.length; m++) {
                $indexNow.find(".dayRemindListContent").append('<div data-id="' + dayRemindList[m].id + '" class="dayRemindContent">' + (dayRemindList[m].title  ? dayRemindList[m].title : '提醒') + '</div>');
            }
            indexNow = $(".now:eq(" + (i - 1) + ")")[0];
            // setTimeout(renderListContent(i), 100);
        }
        if(typeof ie === "number" && ie < 9){
            setTimeout(function(){renderListContents()}, 100);
        }else {
            setTimeout(function(){renderListContents()}, 100);
        }
    }
    function renderListContent(i){
        var index = i;
        var dom = $(".now:eq(" + (index - 1) + ")");
        if (dom.find(".dayRemindListContent").height() > dom.find('.dayContent').height() - dom.find('.dayNum').height() - dom.find('.cnDate').height() - 50) {
            dom.addClass('dayRemindListPlus');
            dom.find('.dayContent').append('<div class="dayRemindListAfter"></div>');
        } else if(dom.find(".dayRemindListContent").height() <= dom.find('.dayContent').height() - dom.find('.dayNum').height() - dom.find('.cnDate').height() - 50) {
            dom.find('.dayRemindListAfter').remove();
            dom.removeClass('dayRemindListPlus');
        }
    }
    function renderListContents(){
        var dom;
        for(var i=0; i< $('.now').length;i++){
            dom = $(".now:eq(" + (i - 1) + ")");
            if (dom.find(".dayRemindListContent").height() > dom.find('.dayContent').height() - dom.find('.dayNum').height() - dom.find('.cnDate').height() - 50) {
                dom.addClass('dayRemindListPlus');
                dom.find('.dayContent').append('<div class="dayRemindListAfter"></div>');
            } else if(dom.find(".dayRemindListContent").height() <= dom.find('.dayContent').height() - dom.find('.dayNum').height() - dom.find('.cnDate').height() - 50) {
                dom.find('.dayRemindListAfter').remove();
                dom.removeClass('dayRemindListPlus');
            }
        }
    }
    function renderListContent(dom) {
        dom = $(dom);
        if (dom.find(".dayRemindListContent").height() > dom.find('.dayContent').height() - dom.find('.dayNum').height() - dom.find('.cnDate').height() - 50 && !dom.hasClass('dayRemindListPlus')) {
            dom.addClass('dayRemindListPlus');
            dom.find('.dayContent').append('<div class="dayRemindListAfter"></div>');
        } else if(dom.find(".dayRemindListContent").height() <= dom.find('.dayContent').height() - dom.find('.dayNum').height() - dom.find('.cnDate').height() - 50) {
            dom.find('.dayRemindListAfter').remove();
            dom.removeClass('dayRemindListPlus');
        }
    }
    function setPicVerify(dom) {
        uuid = Math.uuid(16, 16);
        $(dom).attr('src', httpProtocol + '//u.51wnl.com/UtilsApi/ImageCode?uuid=' + uuid);
        $(dom).on('load', function() {
            $(this).removeClass('hidden');
        });
    }
    function getVerifyCode(phone, type, imgCode) { //, isAgain
        var domString = '';
        count = 60;
        if (type === 2) {
            domString = '.phoneChangePwdContent ';
        }
        else if (type === 3) {
            domString = '.phoneLoginContent ';
        }
        else if (type === 0) {
            domString = '.phoneRegisterContent ';
        }
        else if (type === 1) {
            domString = '.bindPhoneConfirmContent ';
        }
        $(domString + '.verifyDTxt').next('#verifyTxt').val('');
        var dataString = {
            'DataString': JSON.stringify({
                'Phone': phone,
                'SmsType': type,
                'uuid': uuid,
                'ImageCode': imgCode
            })
        };
        $.ajax({
            url: httpProtocol + '//u.51wnl.com/UtilsApi/SendSmsCode',
            type: 'POST',
            dataType: 'json',
            data: dataString,
            success: function(result) {
                if (result.status !== 200) {
                    setTimeout(function() {
                        drawToast('短信发送失败,请稍后重试');
                    }, 0);
                    return;
                }
                if (result.data.result === 1) {
                    $(domString + '.get_verify_code').addClass('count');
                    if (type === 2) {
                        router.redirect('#/phoneChangePwd/' + phone + '/' + imgCode);
                    }
                    // else {
                    //  if (!isAgain) {
                    //      router.redirect('#/picverify/' + phone + '/' + type + '/' + imgCode);
                    //  }
                    // }
                    setTimeout(function() {
                        drawToast('短信验证码发送成功');
                    }, 0);
                    verifyTimeCount = setInterval(function() {
                        $(domString + '.get_verify_code').html(count + '秒');
                        count--;
                        if (count < -1) {
                            clearInterval(verifyTimeCount);
                            verifyTimeCount = null;
                            $(domString + '.get_verify_code').removeClass('count');
                            $(domString + '.get_verify_code').html('重新获取验证码');
                            count = 60;
                        }
                    }, 1000);
                }
                else if (result.data.result === 101) {
                    if (type === 0) {
                        setTimeout(function() {
                            drawToast('该手机号已经注册，请返回登录');
                        }, 0);
                    }
                    else {
                        setTimeout(function() {
                            drawToast('手机号已存在');
                        }, 0);
                    }
                }
                else if (result.data.result === 102) {
                    if (type === 2) {
                        setTimeout(function() {
                            drawToast('手机号未注册');
                        }, 0);
                    }
                    else {
                        setTimeout(function() {
                            drawToast('手机号不存在');
                        }, 0);
                    }
                }
                else if (result.data.result === 105) {
                    setTimeout(function() {
                        drawToast('图片验证码已过期,点击图片刷新');
                    }, 0);
                }
                else if (result.data.result === 106) {
                    setTimeout(function() {
                        drawToast('请输入正确验证码,点击图片刷新');
                    }, 0);
                }
                else {
                    setTimeout(function() {
                        drawToast('短信发送失败,请稍后重试');
                    }, 0);
                }
            },
            error: function(xhr, status, errorMsg) {
                setTimeout(function() {
                    drawToast('短信发送失败,请稍后重试');
                }, 0);
            }
        });
    }
    function getListReminds(currentSelectedDate, keyword) {
        $(".remindList").empty();
        var nowDate = new Date();
        nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
        var currentYear = currentSelectedDate.getFullYear(), currentMonth = currentSelectedDate.getMonth(), currentDay = currentSelectedDate.getDate();
        currentSelectedDate = new Date(currentYear, currentMonth, currentDay);
        var monthDayCount = (new Date(currentYear, currentMonth + 1, 0).getDate());
        for (var i = 1; i <= monthDayCount; i++) {
            var dayRemindList = [];
            var dayDate = new Date(currentYear, currentMonth, i);
            for (var j = 0; j < localReminderList.length; j++) {
                var startDate = getLocalTime(localReminderList[j].tdatetime);
                var startYear = startDate.getFullYear(), startMonth = startDate.getMonth(), startDay = startDate.getDate();
                startDate = new Date(startYear, startMonth, startDay);
                if (localReminderList[j].status === 2 || dayDate < startDate) {
                    continue;
                }
                if (currentYear === startYear && currentMonth === startMonth && i === startDay) {
                    dayRemindList.push(localReminderList[j]);
                    continue;
                }
                var repeattype = localReminderList[j].repeattype, datetype = localReminderList[j].datetype;
                var lunarStartDate = new Lunar(startDate);
                var lunarCurrentDate = new Lunar(dayDate);
                var lMonthDayCount = 0;
                if (repeattype === 0) {
                    if (currentYear === startYear && currentMonth === startMonth && i === startDay) {
                        dayRemindList.push(localReminderList[j]);
                    }
                }
                else if (repeattype === 1000) {
                    if (datetype === 1) {
                        if (lunarStartDate.isLeap) {
                            if (lunarCurrentDate.isLeap) {
                                lMonthDayCount = leapDays(lunarCurrentDate.year);
                                if ((leapMonth(lunarStartDate.year) === leapMonth(lunarCurrentDate.year) && lunarStartDate.day === lunarCurrentDate.day) ||
                                    (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                    dayRemindList.push(localReminderList[j]);
                                }
                            }
                            else {
                                lMonthDayCount = monthDays(lunarCurrentDate.year, lunarCurrentDate.month);
                                if ((leapMonth(lunarStartDate.year) === lunarCurrentDate.month && lunarStartDate.day === lunarCurrentDate.day) ||
                                    (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                    dayRemindList.push(localReminderList[j]);
                                }
                            }
                        }
                        else {
                            lMonthDayCount = monthDays(lunarCurrentDate.year, lunarCurrentDate.month);
                            if ((lunarStartDate.month === lunarCurrentDate.month && lunarStartDate.day === lunarCurrentDate.day) ||
                                (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                dayRemindList.push(localReminderList[j]);
                            }
                        }
                    }
                    else {
                        if ((startMonth === currentMonth && i === startDay) || (i === monthDayCount && startDay > i && startMonth === currentMonth)) {
                            dayRemindList.push(localReminderList[j]);
                        }
                    }
                }
                else if (repeattype > 2000 && repeattype < 3000) {
                    if ((startYear * 12 + startMonth - (currentYear * 12 + currentMonth)) % (repeattype - 2000) === 0) {
                        if (datetype === 1) {
                            if (lunarStartDate.isLeap) {
                                if (lunarCurrentDate.isLeap) {
                                    lMonthDayCount = leapDays(lunarCurrentDate.year);
                                    if ((lunarStartDate.day === lunarCurrentDate.day) ||
                                        (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                        dayRemindList.push(localReminderList[j]);
                                    }
                                }
                                else {
                                    lMonthDayCount = monthDays(lunarCurrentDate.year, lunarCurrentDate.month);
                                    if ((lunarStartDate.day === lunarCurrentDate.day) ||
                                        (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                        dayRemindList.push(localReminderList[j]);
                                    }
                                }
                            }
                            else {
                                lMonthDayCount = monthDays(lunarCurrentDate.year, lunarCurrentDate.month);
                                if ((lunarStartDate.day === lunarCurrentDate.day) ||
                                    (lunarCurrentDate.day === lMonthDayCount && lunarStartDate.day > lunarCurrentDate.day)) {
                                    dayRemindList.push(localReminderList[j]);
                                }
                            }
                        }
                        else {
                            if ((i === startDay) || (i === monthDayCount && startDay > i)) {
                                dayRemindList.push(localReminderList[j]);
                            }
                        }
                    }
                }
                else if (repeattype > 3000 && repeattype < 4000) {
                    var iDays = parseInt(Math.abs(dayDate - startDate) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数
                    if (iDays % (repeattype - 3000) === 0) {
                        dayRemindList.push(localReminderList[j]);
                    }
                }
                else {
                    var weekTag = Math.pow(2, dayDate.getDay());
                    if (((repeattype - 4000) & weekTag) === weekTag) {
                        dayRemindList.push(localReminderList[j]);
                    }
                }
            }
            dayRemindList = dayRemindList.sort(function (a, b) {
                if (a.isallday && !b.isallday) {
                    return -1;
                }
                else if (!a.isallday && b.isallday) {
                    return 1;
                }
                else if (a.isallday && b.isallday) {
                    var aDate = getLocalTime(a.createdate), bDate = getLocalTime(b.createdate);
                    var aTime = aDate.getHours() * 3600 + aDate.getMinutes() * 60;
                    var bTime = bDate.getHours() * 3600 + bDate.getMinutes() * 60;
                    if (aTime > bTime) {
                        return 1;
                    }
                    else if (aTime < bTime) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
                else if (!a.isallday && !b.isallday) {
                    var aDate = getLocalTime(a.tdatetime), bDate = getLocalTime(b.tdatetime);
                    var aTime = aDate.getHours() * 3600 + aDate.getMinutes() * 60;
                    var bTime = bDate.getHours() * 3600 + bDate.getMinutes() * 60;
                    if (aTime > bTime) {
                        return 1;
                    }
                    else if (aTime < bTime) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            });
            var tempRemindItem = $(".tempRemindItem").clone();
            if (dayDate - nowDate === 0) {
                tempRemindItem.addClass("today");
            }
            else if (dayDate - nowDate < 0) {
                tempRemindItem.addClass("preveDay");
            }
            else {
                tempRemindItem.addClass("nextDay");
            }
            var cuurentWeekString = weekListString[(new Date(currentYear, currentMonth, i)).getDay()];
            tempRemindItem.find(".remindDay").html((currentMonth + 1) + "月" + i + "日");
            tempRemindItem.find(".remindYear").html(currentYear + "年");
            tempRemindItem.find(".remindWeek").html(cuurentWeekString);
            var dayRemindListDom = tempRemindItem.find(".dayRemindList");
            for (var j = 0; j < dayRemindList.length; j++) {
                if (keyword && dayRemindList[j].title.indexOf(keyword) < 0) {
                    continue;
                }
                var tempRemindLink = $(".tempRemindLink").clone();
                tempRemindLink.html(dayRemindList[j].title ? dayRemindList[j].title : '提醒');
                tempRemindLink.data("id", dayRemindList[j].id);
                tempRemindLink.removeClass("tempRemindLink");
                dayRemindListDom.append(tempRemindLink);
                tempRemindLink.removeClass("hidden");
            }
            if (dayRemindListDom.find(".remindLink").length > 0) {
                tempRemindItem.removeClass("tempRemindItem");
                tempRemindItem.appendTo(".remindList");
                tempRemindItem.removeClass("hidden");
            }
            else {
                tempRemindItem.remove();
            }
        }
    }
    $(document).on("click", ".dayRemindContent", function (e) {
        $('.dayRemindContent').removeClass('active');
        $('.addRemindDesc').removeClass('active');
        $(e.currentTarget).addClass('active');
        if(!$('.initiaNote').hasClass('hidden')){
            $('.initialNote').addClass('hidden');
            $('.initialRepeat').addClass('hidden');
            $('.initialRepeat').text('');
            $('.initialNote').text('');
        }
        try{
            $(".remindTitleList").empty();
            var dom = $(e.currentTarget).parent().parent().parent().parent()[0];
            var $dom = $(e.currentTarget);
            var tempTop = $dom.offset().top - 104;
            if($dom.offset().left > 0.6 * $(document).width()) {
                Position.set({d:'right', x: $dom.offset().left - 360,y: $dom.offset().top - 104});
            } else {
                Position.set({d:'left', x: $dom.offset().left + $dom.width() ,y: $dom.offset().top - 104})
            }
            if($dom.offset().top > 0.9 * $(document).height()) {
                Position.grouth(0.3);
            } else if($dom.offset().top > 0.8 * $(document).height()) {
                Position.grouth(0.2);
            } else if($dom.offset().top > 0.7 * $(document).height()) {
                Position.grouth(0.1);
            }
            var $parentdom = $(dom);
            if(!$parentdom.hasClass('expand')){
                $('.day.active').removeClass('active');
                $(dom).addClass('active');
                $('.now.expand').remove();
            } else {
                // tempdom = $dom;
                // $parentdom = $(dom);
                // $dom = $('.active.day').first().find('.dayRemindContent').eq(tempdom.index());
                // if(tempdom.index() < 5) {
                //     if($dom.offset().left > 6.6/10*$(document).width()) {
                //         Position.set({d:'right', x: $dom.offset().left - 360,y: $dom.offset().top - 104});
                //     } else {
                //         Position.set({d:'left', x: $dom.offset().left + $dom.width() ,y: $dom.offset().top - 104});
                //     }
                // } else {
                //     Position.set({d:'left', x: $dom.offset().left + $dom.width() ,y: tempTop - 16*(tempdom.index() - 5)});
                // }
            }
            var dayTemp = $(e.currentTarget).parents().parents(".day");
            var selectYear = parseInt(dayTemp.data("year"));
            var selectMonth = parseInt(dayTemp.data("month"));
            var selectDay = parseInt(dayTemp.data("day"));
            var selectTitle = $(this).text();
            $(".remindSDate").html(selectDay);
            var chooseMonthLunarInfo = new calendar(selectYear, selectMonth);
            $(".remindLDate").html(cDay(chooseMonthLunarInfo[selectDay - 1].lDay));
            var idList = [];
            dayTemp.find(".dayRemindContent").each(function () {
                idList.push($(this).data("id"));
            });
            var dayRemindList = [];
            if(localReminderList){
                for (var i = 0; i < localReminderList.length; i++) {
                    for (var j = 0; j < idList.length; j++) {
                        if (idList[j] === localReminderList[i].id) {
                            dayRemindList.push(localReminderList[i]);
                        }
                    }
                }
            }
            dayRemindList = dayRemindList.sort(function (a, b) {
                if (a.isallday && !b.isallday) {
                    return -1;
                }
                else if (!a.isallday && b.isallday) {
                    return 1;
                }
                else if (a.isallday && b.isallday) {
                    var aDate = getLocalTime(a.createdate), bDate = getLocalTime(b.createdate);
                    var aTime = aDate.getHours() * 3600 + aDate.getMinutes() * 60;
                    var bTime = bDate.getHours() * 3600 + bDate.getMinutes() * 60;
                    if (aTime > bTime) {
                        return 1;
                    }
                    else if (aTime < bTime) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
                else if (!a.isallday && !b.isallday) {
                    var aDate = getLocalTime(a.tdatetime), bDate = getLocalTime(b.tdatetime);
                    var aTime = aDate.getHours() * 3600 + aDate.getMinutes() * 60;
                    var bTime = bDate.getHours() * 3600 + bDate.getMinutes() * 60;
                    if (aTime > bTime) {
                        return 1;
                    }
                    else if (aTime < bTime) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            });
            for (var j = 0; j < dayRemindList.length; j++) {
                createDate = getLocalTime(dayRemindList[j].tdatetime);
                var tempRemindTitleItem = $(".tempRemindTitleItem").clone();
                tempRemindTitleItem.data("id", dayRemindList[j].id);
                tempRemindTitleItem.find(".itemTitle").html(dayRemindList[j].title ? dayRemindList[j].title : '提醒');
                if (dayRemindList[j].isallday) {
                    tempRemindTitleItem.find(".itemTime").html("全天");
                }
                else {
                    tempRemindTitleItem.find(".itemTime").html((createDate.getHours() < 10 ? "0" + createDate.getHours() : createDate.getHours().toString()) + ":" + (createDate.getMinutes() < 10 ? "0" + createDate.getMinutes() : createDate.getMinutes()));
                }
                if(selectTitle === (dayRemindList[j].title ? dayRemindList[j].title : '提醒' )){
                    $(".remindTitleList").append(tempRemindTitleItem);
                    setTimeout(function(){
                        $('.remindTitleList').find('.remindTitleItem').trigger('click');
                    }, 100);
                    break;
                }
            }
            // 隐藏提醒列表
            // $(".remindListContent").removeClass("hidden");
            var clientX = 0, clientY = 0;
            if (e.clientX && e.clientY) {
                clientX = e.clientX + document.documentElement.scrollLeft;
                clientY = e.clientY + document.documentElement.scrollTop;
            }
            else {
                clientX = $(this).offset().left + $(this).width() / 2;
                clientY = $(this).offset().top;
            }
            var $remindListPanel = $(".remindListPanel");
            var contentLeft = (clientX + 10 + $remindListPanel.width()) > $window.width() ? (clientX - $remindListPanel.width() - 10) : (clientX + 10);
            $remindListPanel.css("left", contentLeft + "px");
            var contentTop = (clientY + $remindListPanel.height() + 10) > $window.height() ? (clientY - $remindListPanel.height() - 10) : clientY + 10;
            contentTop = contentTop < 0 ? 0 : contentTop;
            $remindListPanel.css("top", contentTop + "px");
        }
        catch(e){
            // console.log('-0');
            console.log(e);
        }
        return false;
    });
    $(document).on("click", ".remindLink", function (e) {
        var id = $(this).data("id");
        for (var j = 0; j < localReminderList.length; j++) {
            if (id === localReminderList[j].id) {
                initEditRemindDetail(localReminderList[j]);
                break;
            }
        }
        $(".deleteBtn").removeClass("hidden");
        $(".addRemindContent").addClass("initial");
        $(".addRemindContent").removeClass("hidden");
        $(".remindTxt").focus();
        makeExpandingArea(document.querySelector('.remindTxt'));
        var clientX = $(this).offset().left + $(this).width();
        var clientY = $(this).offset().top + $(this).height() / 2;
        var $addRemindDiv = $(".addRemindDiv");
        var contentTop = (clientY - $addRemindDiv.height() / 2) > 0 ? (clientY - $addRemindDiv.height() / 2) : 0;
        contentTop = (clientY + $addRemindDiv.height() + 10) > $window.height() ? ($window.height() - $addRemindDiv.height() - 90) : clientY - $addRemindDiv.height() / 2 + 10;
        $addRemindDiv.css("top", contentTop + "px");
        var contentLeft = 0;
        if ((clientX + $addRemindDiv.width()) > $window.width()) {
            contentLeft = clientX - $addRemindDiv.width() - 10;
            $(".boxArrowLfet").addClass("hidden");
            $(".boxArrowRight").removeClass("hidden");
            $(".boxArrowRight").css("top", (contentTop + $addRemindDiv.height() / 2 - 14) + "px");
            $(".boxArrowRight").css("left", (contentLeft + $addRemindDiv.width() - 15) + "px");
        }
        else {
            contentLeft = clientX + $(this).parents(".remindListPanel").width() + 10;
            $(".boxArrowLfet").removeClass("hidden");
            $(".boxArrowRight").addClass("hidden");
            $(".boxArrowLfet").css("top", (contentTop + $addRemindDiv.height() / 2 - 14) + "px");
            $(".boxArrowLfet").css("left", (contentLeft - 22) + "px");
        }
        $addRemindDiv.css("left", contentLeft + "px");
    });
    $(".friendLink").on('mouseenter',function (e) {
        $(e.currentTarget).find('.friendLinkAfter').removeClass('hidden');
    });
    $(".friendLink").on('mouseleave',function (e) {
        $(e.currentTarget).find('.friendLinkAfter').addClass('hidden');
    });
    $(document).on('mouseenter', '.dayRemindListAfter', function(e){
        $(e.currentTarget).addClass('focus');
    });
    $(document).on('mouseleave', '.dayRemindListAfter', function(e){
        $(e.currentTarget).removeClass('focus');
    });
    $(document).on('click', '.dayRemindListAfter', function(e){
        e.stopPropagation();
        $('.now.expand').remove();
        var dom = $(e.currentTarget).parent().parent().parent()[0];
        var year = $(dom).data('year');
        var month = $(dom).data('month');
        var day = $(dom).data('day');
        $('.day.active').removeClass('active');
        // $(dom).addClass('expand');
        $(dom).addClass('active');
        // $(e.currentTarget).parent().css('height', '');
        $('.monthDayList').append($(e.currentTarget).parent().parent().parent().clone(true).addClass('expand').css('display', 'none'));
        // $(dom).removeClass('expand');
        // $(dom).attr('dataset-year', year);
        // $(dom).attr('dataset-month', month);
        // $(dom).attr('dataset-day', day);
        setTimeout(function(){
            expand($('.day.now').last()[0],$(e.currentTarget).parent().parent().parent()[0], year, month, day);
        }, 150);
    });
    // $(document).on('mouseleave', '.expand.day', function(){
    //     $('.expand.day').remove();
    // });
    // $(document).on('click', '.expand.day .dayRemindContent', function(){
    //     setTimeout(function(){
    //         $('.expand.day').prev().addClass('active');
    //         $('.expand.day').remove();
    //     }, 100);
    // });
    // $(document).on('click', '.expand.day .addRemindDesc', function(e){
    //     setTimeout(function(){
    //         $('.expand.day').prev().addClass('active');
    //         $('.expand.day').remove();
    //     }, 100);
    //     // console.log($(e.currentTarget));
    // });
    $(".downloadBtn").hover(function () {
        $(".downloadPanel").fadeIn();
        $(".downloadContent").removeClass("hidden");
    }, function () { });
    $(".downloadPanel").hover(function () {
        $(".downloadPanel").fadeIn();
    }, function () {
        $(".downloadPanel").fadeOut();
        $(".downloadContent").addClass("hidden");
    });
    $(".dayViewBtn").click(function () {
        if (!$(this).hasClass("active")) {
            $(".remindContent").addClass("hidden");
            $(".dayInfoContent").removeClass("hidden");
            $(".remindBtn").removeClass("active");
            $(this).addClass("active");
            // $(".dayViewNavContent").css("background-image", "url('img_new/left-multi01.png')");
            $(".dayViewYiDescContent").width($(".yiViewContent").width() - 50);
            $(".dayViewJiDescContent").width($(".jiViewContent").width() - 50);
        }
    });
    $(".remindBtn").click(function () {
        if (!userLocalData) {
            alert("请先登录后查看提醒信息");
            return false;
        }
        if (!$(this).hasClass("active")) {
            $(".dayInfoContent").addClass("hidden");
            $(".remindContent").removeClass("hidden");
            $(".dayViewBtn").removeClass("active");
            $(this).addClass("active");
            // $(".dayViewNavContent").css("background-image", "url('img_new/left-multi02.png')");
        }
    });
    function initFangjia(){
        var days = 0;
        var day = new Date();
        var y = day.getFullYear();
        var m = day.getMonth();
        var d = day.getDate();
        do {
            pushJieri(y, m, d + days, days);
            days++;
        } while(days < 365);
    }
    setTimeout( function(){
        initFangjia();
    }, 3000);
    function pushJieri(year, month, day, days) {
        var dayNow = new Date();
        var yearNow = dayNow.getFullYear();
        var dayViewDate = new Date(year, month, day);
        var days = days;
        var year = dayViewDate.getFullYear();
        var month = dayViewDate.getMonth();
        var day = dayViewDate.getDate();
        var weekListString = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var chooseMonthLunarInfo = new calendar(year, month);
        var lYear = chooseMonthLunarInfo[day - 1].lYear;
        var lMonth = chooseMonthLunarInfo[day - 1].lMonth;
        var lDay = chooseMonthLunarInfo[day - 1].lDay;
        var jieriList = getJieriList(lYear, chooseMonthLunarInfo[day - 1].isLeap && leapMonth(lYear) === lMonth ? 13 : lMonth, lDay, year, month, day);
        if(isEaster(year, month + 1, day)) {
            jieriList.push({V: "复活节", P: "6", Y: year})
        } else if(month === 3 && day === 1){
            jieriList.push({V: "税收宣传月", P: "6", Y: year})
        }
        var hanshu = isHanshu(new Date(year, month, day))
        if (!!hanshu){
            jieriList.push({V: hanshu, P: "7", Y: year});
        }
        for (var i = 0; i < jieriList.length; i++) {
            if(_.every(jieriArr, function(tem){
                return jieriList[i].V.indexOf(tem) === -1;
            })){
                $('#fangjiaList').append('<div class="fangjiaItem"><div class="fangjiaTitle">'+jieriList[i].V+'</div><div class="fangjiaTime" data-year="'+year+'" data-month="'+month+'" data-day="'+day+'">'+(year>yearNow?(year + '年'):'')+(month+1)+'月'+ day +'日</div><div class="fangjiaDays">'+days+'天后</div></div>');    
            }        
        }
    }
    $(document).on('click', '.fangjiaItem', function(e){
        $(".fangjiaContent").addClass("hidden");
        var $fangjiaDay = $(this).find(".fangjiaTime");
        var year = parseInt($fangjiaDay.attr('data-year'));
        var month = parseInt($fangjiaDay.attr('data-month'));
        var day = parseInt($fangjiaDay.attr('data-day'));
        dateCurrent = new Date(year, month, day);
        $(".dateTxt").html(year + "年" + (month + 1) + "月");
        $(".monthDayList .day").detach();
        createMonthDayList(dateCurrent);
    })
    function setDayViewInfo(year, month, day) {
        var dayViewDate = new Date(year, month, day);
        var weekListString = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var chooseMonthLunarInfo = new calendar(year, month);
        var lYear = chooseMonthLunarInfo[day - 1].lYear;
        var lMonth = chooseMonthLunarInfo[day - 1].lMonth;
        var lDay = chooseMonthLunarInfo[day - 1].lDay;
        var jieqi = chooseMonthLunarInfo[day - 1].solarTerms;
        var jieriList = getJieriList(lYear, chooseMonthLunarInfo[day - 1].isLeap && leapMonth(lYear) === lMonth ? 13 : lMonth, lDay, year, month, day);
        var jieriListString = jieqi + "  ";
        for (var i = 0; i < jieriList.length; i++) {
            jieriListString += jieriList[i].V + " ";
        }
        if (isEaster(year, month + 1, day)) {
            jieriListString += '复活节 ';
        }
        if(month===3&& day === 1){
            jieriListString += '税收宣传月 ';
        }
        var hanshu = isHanshu(new Date(year, month, day))
        if (!!hanshu){
            jieriListString += hanshu;
        }
        $(".festivalInfo").html(jieriListString);
        //农历日期
        var monthCN = (chooseMonthLunarInfo[day - 1].isLeap ? '闰 ' : '') + monthName[chooseMonthLunarInfo[day - 1].lMonth - 1]
            + cDay(chooseMonthLunarInfo[day - 1].lDay);
        $(".lumarInfo1").html(monthCN + " " + weekListString[dayViewDate.getDay()] + ' ');
        if($('.monthDayList').find('.active').hasClass('jieqi')){
            $(".lumarInfo1").append('<span style="color:#D93448">'+$('.monthDayList').find('.active').find('.cnDate').text()+'</span>');
            jieriListString = jieriListString.replace($('.monthDayList').find('.active').find('.cnDate').text(),' ');
            $(".festivalInfo").html(jieriListString);
        }
        var yearCN = chooseMonthLunarInfo[day - 1].cYear + '年 ' + chooseMonthLunarInfo[day - 1].cMonth + '月 '
            + chooseMonthLunarInfo[day - 1].cDay + '日';
        // console.log(lYear)
        $(".lumarInfo2").html(yearCN  + "【属" + getPet(lYear, getLichunOffset(year, month, day)) + "】");


        //getDayViewHuangliInfo(year,month,day);
        //getDayViewYijiInfo(year,month,day);

        var hlObj = querySAByDay(new Date(year, month, day));
        var $pzbjDom = $(".pzbj"), $jsyqDom = $(".jsyq"), $xsyj = $(".xsyj"), $csDom = $(".cs"), $wxDom = $(".wx");
        $pzbjDom.html(hlObj.pzbj);
        $jsyqDom.html(hlObj.jsyq);
        $xsyj.html(hlObj.xsyj);
        $csDom.html(hlObj.cs);
        $wxDom.html(hlObj.wx);
        var $dayViewYiDescDom = $(".dayViewYiDescContent"), $dayViewJiDescDom = $(".dayViewJiDescContent");
        $dayViewYiDescDom.html(hlObj.yi ? hlObj.yi : '-');
        $dayViewJiDescDom.html(hlObj.ji ? hlObj.ji : '-');
        $dayViewYiDescDom.width($(".yiViewContent").width() - 50);
        $dayViewJiDescDom.width($(".jiViewContent").width() - 50);
        $(".dayInfoContent").height(contentHeight - 50);
        $(".remindList").height(contentHeight - 40 - 40 * 2);
    }
    function getLichunOffset(year, month, day) {
        if (year >= 2010 && year <= 2030) {
            var lichunDate = new Date(year, 0, 1);
            lichunDate.setDate(lichunDate.getDate() + JQYearDate[year][2]);
            var calDate = new Date(year, month, day);
            return (calDate - lichunDate);
        }
        else {
            return 0;
        }
    }
    function getDayViewHuangliInfo(year, month, day) {
        month = month + 1;
        var dayHuangliObj = {
            "pzbj": "暂无",
            "jsyq": "暂无",
            "xsyj": "暂无",
            "cs": "暂无",
            "wx": "暂无"
        };
        var $pzbjDom = $(".pzbj"), $jsyqDom = $(".jsyq"), $xsyj = $(".xsyj"), $csDom = $(".cs"), $wxDom = $(".wx");
        if (year >= 2010 && year <= 2025) {
            var yearHuangLi = huangliInfoList[year];
            if (!yearHuangLi) {
                $.ajax({
                    type: "get",
                    url: "moreLumarData/" + year + ".json",
                    dataType: "json",
                    success: function (data) {
                        huangliInfoList[year] = data;
                        var dayHuangli = huangliInfoList[year][(month < 10 ? "0" + month : month.toString()) + (day < 10 ? "0" + day : day.toString())];
                        if (dayHuangli) {
                            dayHuangliObj.pzbj = dayHuangli.pzbj;
                            dayHuangliObj.jsyq = dayHuangli.jsyq;
                            dayHuangliObj.xsyj = dayHuangli.xsyj ? dayHuangli.xsyj : "暂无";
                            dayHuangliObj.cs = dayHuangli.cs;
                            dayHuangliObj.wx = dayHuangli.wx;
                        }
                        $pzbjDom.html(dayHuangliObj.pzbj);
                        $jsyqDom.html(dayHuangliObj.jsyq);
                        $xsyj.html(dayHuangliObj.xsyj);
                        $csDom.html(dayHuangliObj.cs);
                        $wxDom.html(dayHuangliObj.wx);
                    },
                    error: function () {
                        $pzbjDom.html(dayHuangliObj.pzbj);
                        $jsyqDom.html(dayHuangliObj.jsyq);
                        $csDom.html(dayHuangliObj.cs);
                        $wxDom.html(dayHuangliObj.wx);
                    }
                })
            }
            else {
                var dayHuangli = huangliInfoList[year][(month < 10 ? "0" + month : month.toString()) + (day < 10 ? "0" + day : day.toString())];
                if (dayHuangli) {
                    dayHuangliObj.pzbj = dayHuangli.pzbj;
                    dayHuangliObj.jsyq = dayHuangli.jsyq;
                    dayHuangliObj.xsyj = dayHuangli.xsyj ? dayHuangli.xsyj : "暂无";
                    dayHuangliObj.cs = dayHuangli.cs;
                    dayHuangliObj.wx = dayHuangli.wx;
                }
                $pzbjDom.html(dayHuangliObj.pzbj);
                $jsyqDom.html(dayHuangliObj.jsyq);
                $xsyj.html(dayHuangliObj.xsyj);
                $csDom.html(dayHuangliObj.cs);
                $wxDom.html(dayHuangliObj.wx);
            }
        }
        else {
            $pzbjDom.html(dayHuangliObj.pzbj);
            $jsyqDom.html(dayHuangliObj.jsyq);
            $xsyj.html(dayHuangliObj.xsyj);
            $csDom.html(dayHuangliObj.cs);
            $wxDom.html(dayHuangliObj.wx);
        }
    }
    function getDayViewYijiInfo(year, month, day) {
        month = month + 1;
        var dayHuangliObj = {
            "dayHuangliYi": "暂无",
            "dayHuangliJi": "暂无"
        };
        var $dayViewYiDescDom = $(".dayViewYiDescContent"), $dayViewJiDescDom = $(".dayViewJiDescContent");
        if (year >= 2008 && year <= 2018) {
            var yearHuangLi = yijiInfoList[year];
            if (!yearHuangLi) {
                $.ajax({
                    type: "get",
                    url: "YJData/" + year + ".json",
                    dataType: "json",
                    success: function (data) {
                        yijiInfoList[year] = data;
                        var dayHuangli = yijiInfoList[year]["d" + (month < 10 ? "0" + month : month.toString()) + (day < 10 ? "0" + day : day.toString())];
                        if (dayHuangli) {
                            dayHuangliObj.dayHuangliYi = dayHuangli.y;
                            dayHuangliObj.dayHuangliJi = dayHuangli.j;
                        }
                        $dayViewYiDescDom.html(dayHuangliObj.dayHuangliYi ? dayHuangliObj.dayHuangliYi : '-');
                        $dayViewJiDescDom.html(dayHuangliObj.dayHuangliJi ? dayHuangliObj.dayHuangliJi : '-');
                        $(".dayViewYiDescContent").width($(".yiViewContent").width() - 50);
                        $(".dayViewJiDescContent").width($(".jiViewContent").width() - 50);
                    },
                    error: function () {
                        $dayViewYiDescDom.html(dayHuangliObj.dayHuangliYi ? dayHuangliObj.dayHuangliYi : '-');
                        $dayViewJiDescDom.html(dayHuangliObj.dayHuangliJi ? dayHuangliObj.dayHuangliJi : '-');
                    }
                })
            }
            else {
                var dayHuangli = yijiInfoList[year]["d" + (month < 10 ? "0" + month : month.toString()) + (day < 10 ? "0" + day : day.toString())];
                if (dayHuangli) {
                    dayHuangliObj.dayHuangliYi = dayHuangli.y;
                    dayHuangliObj.dayHuangliJi = dayHuangli.j;
                }
                $dayViewYiDescDom.html(dayHuangliObj.dayHuangliYi ? dayHuangliObj.dayHuangliYi : '-');
                $dayViewJiDescDom.html(dayHuangliObj.dayHuangliJi ? dayHuangliObj.dayHuangliJi : '-');
            }
        }
        else {
            $dayViewYiDescDom.html(dayHuangliObj.dayHuangliYi ? dayHuangliObj.dayHuangliYi : '-');
            $dayViewJiDescDom.html(dayHuangliObj.dayHuangliJi ? dayHuangliObj.dayHuangliJi : '-');
        }
    }
    function getJieriList(lYear, lMonth, lDay, sYear, sMonth, sDay) {
        lYear = parseInt(lYear, 10);
        sYear = parseInt(sYear, 10);
        sMonth += 1;
        var lDateString = (lMonth < 10 ? "0" + lMonth : lMonth.toString()) + (lDay < 10 ? "0" + lDay : lDay.toString());
        var sDateString = (sMonth < 10 ? "0" + sMonth : sMonth.toString()) + (sDay < 10 ? "0" + sDay : sDay.toString());
        var jieriList = [];
        var sJieriList = festivalData.S[sDateString];
        if (sJieriList && sJieriList.length > 0) {
            for (var i = 0; i < sJieriList.length; i++) {
                if (sYear >= parseInt(sJieriList[i].Y, 10) && parseInt(sJieriList[i].P, 10) >= 0) {
                    jieriList.push(sJieriList[i]);
                }
            }
        }
        var lJieriList = festivalData.L[lDateString];
        if (lJieriList && lJieriList.length > 0) {
            for (var i = 0; i < lJieriList.length; i++) {
                if (lYear >= parseInt(lJieriList[i].Y, 10) && parseInt(lJieriList[i].P, 10) >= 0) {
                    jieriList.push(lJieriList[i]);
                }
            }
        }
        var wDateString = getWeekIndexString(sYear, sMonth, sDay);
        var wJieriList = festivalData.W[wDateString];
        if (wJieriList && wJieriList.length > 0) {
            for (var i = 0; i < wJieriList.length; i++) {
                if (sYear >= parseInt(wJieriList[i].Y, 10) && parseInt(wJieriList[i].P, 10) >= 0) {
                    jieriList.push(wJieriList[i]);
                }
            }
        }
        if (jieriList.length > 0) {
            jieriList.sort(function (a, b) {
                a = parseInt(a.P, 10);
                b = parseInt(b.P, 10);
                if (a === b) {
                    return 0;
                }
                else {
                    return a < b ? 1 : -1;
                }
            });
            if (jieriList.length > 2) {
                jieriList.length = 2;
            }
        }
        return jieriList;
    }

    $(".preveMonthRemind").click(function () {
        var keyword = $.trim($(".searchInput").val());
        if (keyword.length === 0) {
            initPreveMonthInfo();
        }
        else {
            initPreveMonthInfo(keyword);
        }
    });
    $(".nextMonthRemind").click(function () {
        var keyword = $.trim($(".searchInput").val());
        if (keyword.length === 0) {
            initNextMonthInfo();
        }
        else {
            initNextMonthInfo(keyword);
        }
    });
    $(".searchConfirmBtn").click(function () {
        var keyword = $.trim($(".searchInput").val());
        if (keyword.length === 0) {
            getListReminds(dateCurrent);
        }
        else {
            getListReminds(dateCurrent, keyword);
        }
    });

    var maxDate = new Date(2050, 11, 31), minDate = new Date(1900, 1, 1);
    $(".todayBtn").click(function () {
        dateCurrent = new Date();
        yearNow = dateCurrent.getFullYear();
        monthNow = dateCurrent.getMonth();
        dayNow = dateCurrent.getDate();
        $(".dateTxt").html(yearNow + "年" + (monthNow + 1) + "月");
        $(".monthDayList .day").detach();
        createMonthDayList(dateCurrent);
        if (userLocalData) {
            $(".searchInput").val("");
            accessToken = userLocalData.AccessToken;
            userid = userLocalData.ID;
            getReminderList(accessToken, clientName, dateCurrent);
        }
        setTimeout(function(){
            if($('.active.day').hasClass('today')){
                if($('.todayBtn').css('visibility') !== 'hidden'){
                    $('.todayBtn').css('visibility', 'hidden');
                }
            } else {
                $('.todayBtn').css('visibility', '');
            }
        }, 100);
    });
    $(".prevBtn").click(function () {
        initPreveMonthInfo();
    });
    $(".nextBtn").click(function () {
        initNextMonthInfo();
    });
    function initPreveMonthInfo(keyword) {
        var tempCurrentDate = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), dateCurrent.getDate());
        tempCurrentDate.setDate(1);
        tempCurrentDate.setMonth(tempCurrentDate.getMonth() + 1);
        if (tempCurrentDate <= minDate) {
            return false;
        }
        dateCurrent.setDate(1);
        dateCurrent.setMonth(dateCurrent.getMonth() - 1);
        yearNow = dateCurrent.getFullYear();
        monthNow = dateCurrent.getMonth();
        dayNow = dateCurrent.getDate();
        $(".dateTxt").html(yearNow + "年" + (monthNow + 1) + "月");
        $(".monthDayList .day").detach();
        createMonthDayList(dateCurrent);
        if (userLocalData) {
            $(".searchInput").val("");
            accessToken = userLocalData.AccessToken;
            userid = userLocalData.ID;
            if (keyword) {
                getReminderList(accessToken, clientName, dateCurrent, keyword);
            }
            else {
                getReminderList(accessToken, clientName, dateCurrent);
            }
        }
    }
    function initNextMonthInfo(keyword) {
        var tempCurrentDate = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), dateCurrent.getDate());
        tempCurrentDate.setDate(1);
        tempCurrentDate.setMonth(tempCurrentDate.getMonth() + 1);
        if (tempCurrentDate >= maxDate) {
            return false;
        }
        dateCurrent.setDate(1);
        dateCurrent.setMonth(dateCurrent.getMonth() + 1);
        yearNow = dateCurrent.getFullYear();
        monthNow = dateCurrent.getMonth();
        dayNow = dateCurrent.getDate();
        $(".dateTxt").html(yearNow + "年" + (monthNow + 1) + "月");
        $(".monthDayList .day").detach();
        createMonthDayList(dateCurrent);
        if (userLocalData) {
            $(".searchInput").val("");
            accessToken = userLocalData.AccessToken;
            userid = userLocalData.ID;
            if (keyword) {
                getReminderList(accessToken, clientName, dateCurrent, keyword);
            }
            else {
                getReminderList(accessToken, clientName, dateCurrent);
            }
        }
    }
    function createMonthDayList(dateObj) {
        var year = dateObj.getFullYear();
        var month = dateObj.getMonth();
        var day = dateObj.getDate();
        var yearNow = (new Date()).getFullYear();
        var monthNow = (new Date()).getMonth();
        var dayNow = (new Date()).getDate();
        var lastChooseYear = parseInt(year), nextChooseYear = parseInt(year);
        var lastChoosMonth = parseInt(month), nextChooseMonth = parseInt(month);
        //本月第一天是星期几
        var weekOfFirstDay = (new Date(year, month, 1).getDay());
        var isVacation, day_cnmonth, jiejiari, solarTerm, day_cn, dayTemp, lYear, lMonth, lDay;
        //本月天数
        var monthDayCount = (new Date(year, month + 1, 0).getDate());
        //本月行数
        var rowCount = Math.ceil((monthDayCount - (7 - weekOfFirstDay)) / 7) + 1;
        //行高
        var rowHeight = Math.floor(calendarHeight / rowCount - 1);
        if (month - 1 < 0) {
            lastChooseYear -= 1;
            lastChoosMonth = 11;
        }
        else {
            lastChoosMonth -= 1;
        }
        //上月农历节日信息
        var lastMonthLunarInfo = new calendar(lastChooseYear, lastChoosMonth);
        //上月天数
        var lastMonthDayCount = (new Date(lastChooseYear, lastChoosMonth + 1, 0)).getDate();
        var dayNumDom, cnDateDom;
        for (var i = lastMonthDayCount - weekOfFirstDay + 1; i <= lastMonthDayCount; i++) {
            dayTemp = $('<a href="javascript:void(0)" class="day last"><div class="dayWrapper"><div class="dayContent"><div class="ie8Icon"></div><div class="dayNum"></div><div class="cnDate"></div><div class="dayRemindListContent"></div></div></div></a>');
            dayNumDom = dayTemp.find('.dayNum');
            dayNumDom.html(i);
            var weekTempDate = new Date(lastChooseYear, lastChoosMonth, i);
            if (weekTempDate.getDay() === 6) {
                dayTemp.addClass("lastWeek");
            }
            isVacation = getVacationClass(lastChooseYear, lastChoosMonth + 1, i);
            if (isVacation.length !== 0) {
                dayTemp.addClass(isVacation);
            }
            lYear = lastMonthLunarInfo[i - 1].lYear;
            lMonth = lastMonthLunarInfo[i - 1].lMonth;
            lDay = lastMonthLunarInfo[i - 1].lDay;
            //农历月份
            day_cnmonth = (lastMonthLunarInfo[i - 1].isLeap ? '闰' : '') + monthName[lastMonthLunarInfo[i - 1].lMonth - 1];
            jiejiari = getJieri(lYear, lastMonthLunarInfo[i - 1].isLeap && leapMonth(lYear) === lMonth ? 13 : lMonth, lDay, lastChooseYear, lastChoosMonth, i);
            solarTerm = lastMonthLunarInfo[i - 1].solarTerms;
            cnDateDom = dayTemp.find('.cnDate');
            //农历日期
            if (jiejiari.length !== 0 && solarTerm.length === 0) {
                day_cn = jiejiari.L ? jiejiari.L : jiejiari.V.substr(0, 5);
            }
            else if (jiejiari.length === 0 && solarTerm.length !== 0) {
                day_cn = solarTerm;
            }
            else if (jiejiari.length !== 0 && solarTerm.length !== 0) {
                day_cn = jiejiari.P > 9 ? (jiejiari.L ? jiejiari.L : jiejiari.V.substr(0, 5)) : solarTerm;
            }
            else if (solarTerm.length === 0 && jiejiari.length === 0) {
                day_cn = cDay(lastMonthLunarInfo[i - 1].lDay);
            }
            cnDateDom.html(day_cn === "初一" ? day_cnmonth : day_cn);
            dayTemp.height(rowHeight);
            dayTemp.find(".dayContent").height(rowHeight);
            dayTemp.appendTo(".monthDayList");
        }
        //本月农历节日信息
        var chooseMonthLunarInfo = new calendar(year, month);
        for (var i = 1; i <= monthDayCount; i++) {
            dayTemp = $('<a href="javascript:void(0)" class="day now"><div class="dayWrapper"><div class="dayContent"><div class="ie8Icon"></div><div class="dayNum"></div><div class="cnDate"></div><div class="dayRemindListContent"></div></div></div></a>');
            //            dayTemp = $('<a href="javascript:void(0)" class="day"><div class="dayNum"></div><div class="cnDate"></div></a>');
            dayNumDom = dayTemp.find('.dayNum');
            dayNumDom.html(i);
            if (!userLocalData) {
                dayTemp.find(".addRemindIcon").css("display", "none");
            }
            if (year === yearNow && month === monthNow && i === dayNow) {
                dayTemp.addClass('today');
            }
            if (i === day) {
                dayTemp.addClass('active');
                dayTemp.find(".addRemindIcon").css("display", "block");
            }

            var weekTempDate = new Date(year, month, i);
            if (weekTempDate.getDay() === 6 || weekTempDate.getDay() === 0) {
                dayTemp.addClass("weekind");
                if (weekTempDate.getDay() === 6) {
                    dayTemp.addClass("lastWeek");
                }
            }
            isVacation = getVacationClass(year, month + 1, i);
            if (isVacation.length !== 0) {
                dayTemp.addClass(isVacation);
            }
            lYear = chooseMonthLunarInfo[i - 1].lYear;
            lMonth = chooseMonthLunarInfo[i - 1].lMonth;
            lDay = chooseMonthLunarInfo[i - 1].lDay;
            //农历月份
            day_cnmonth = (chooseMonthLunarInfo[i - 1].isLeap ? '闰' : '') + monthName[chooseMonthLunarInfo[i - 1].lMonth - 1];
            jiejiari = getJieri(lYear, chooseMonthLunarInfo[i - 1].isLeap && leapMonth(lYear) === lMonth ? 13 : lMonth, lDay, year, month, i);
            solarTerm = chooseMonthLunarInfo[i - 1].solarTerms;
            cnDateDom = dayTemp.find('.cnDate');
            //农历日期
            if (jiejiari.length !== 0 && solarTerm.length === 0) {
                day_cn = jiejiari.L ? jiejiari.L : jiejiari.V.substr(0, 5);
                dayTemp.addClass("jieri");
            }
            else if (jiejiari.length === 0 && solarTerm.length !== 0) {
                day_cn = solarTerm;
                dayTemp.addClass("jieqi");
            }
            else if (jiejiari.length !== 0 && solarTerm.length !== 0) {
                if (jiejiari.P > 9) {
                    day_cn = jiejiari.L ? jiejiari.L :jiejiari.V.substr(0, 5);
                    dayTemp.addClass("jieri");
                }
                else {
                    day_cn = solarTerm;
                    dayTemp.addClass("jieqi");
                }
            }
            else if (solarTerm.length === 0 && jiejiari.length === 0) {
                day_cn = cDay(chooseMonthLunarInfo[i - 1].lDay);
            }
            cnDateDom.html(day_cn === "初一" ? day_cnmonth : day_cn);
            dayTemp.data("year", year);
            dayTemp.data("month", month);
            dayTemp.data("day", i);
            dayTemp.height(rowHeight);
            dayTemp.find(".dayContent").height(rowHeight);
            dayTemp.appendTo(".monthDayList");
        }
        //下月农历节日信息
        var nextMonthLunarInfo;
        if (month + 1 > 11) {
            nextChooseYear += 1;
            nextChooseMonth = 0;
        }
        else {
            nextChooseMonth += 1;
        }
        //下月农历节日信息
        nextMonthLunarInfo = new calendar(nextChooseYear, nextChooseMonth);
        for (var i = 1; i <= rowCount * 7 - monthDayCount - weekOfFirstDay; i++) {
            dayTemp = $('<a href="javascript:void(0)" class="day next"><div class="addRemindIcon"></div><div class="dayWrapper"><div class="dayContent"><div class="ie8Icon"></div><div class="dayNum"></div><div class="cnDate"></div><div class="dayRemindListContent"></div></div></div></a>');
            dayNumDom = dayTemp.find('.dayNum');
            dayNumDom.html(i);
            var weekTempDate = new Date(nextChooseYear, nextChooseMonth, i);
            if (weekTempDate.getDay() === 6) {
                dayTemp.addClass("lastWeek");
            }
            isVacation = getVacationClass(nextChooseYear, nextChooseMonth + 1, i);
            if (isVacation.length !== 0) {
                dayTemp.addClass(isVacation);
            }
            lYear = nextMonthLunarInfo[i - 1].lYear;
            lMonth = nextMonthLunarInfo[i - 1].lMonth;
            lDay = nextMonthLunarInfo[i - 1].lDay;
            //农历月份
            day_cnmonth = (nextMonthLunarInfo[i - 1].isLeap ? '闰' : '') + monthName[nextMonthLunarInfo[i - 1].lMonth - 1];
            jiejiari = getJieri(lYear, nextMonthLunarInfo[i - 1].isLeap && leapMonth(lYear) === lMonth ? 13 : lMonth, lDay, nextChooseYear, nextChooseMonth, i);
            cnDateDom = dayTemp.find('.cnDate');
            if (jiejiari.V && jiejiari.V.length >= 4 && $(window).width() <= 320) {
                cnDateDom.addClass("smallFont");
            }
            //农历日期
            if (jiejiari.length !== 0 && solarTerm.length === 0) {
                day_cn = jiejiari.L ? jiejiari.L : jiejiari.V.substr(0, 5);
            }
            else if (jiejiari.length === 0 && solarTerm.length !== 0) {
                day_cn = solarTerm;
            }
            else if (jiejiari.length !== 0 && solarTerm.length !== 0) {
                day_cn = jiejiari.P > 9 ? (jiejiari.L ? jiejiari.L : jiejiari.V.substr(0, 5)) : solarTerm;
            }
            else if (solarTerm.length === 0 && jiejiari.length === 0) {
                day_cn = cDay(nextMonthLunarInfo[i - 1].lDay);
            }
            cnDateDom.html(day_cn === "初一" ? day_cnmonth : day_cn);
            dayTemp.height(rowHeight);
            dayTemp.find(".dayContent").height(rowHeight);
            dayTemp.appendTo(".monthDayList");
        }
        setDayViewInfo(year, month, day);
        getReminderList(accessToken, clientName, dateCurrent);
    }
    function getVacationClass(year, month, day) {
        var dateString = year.toString() + (month < 10 ? "0" + month : month).toString() + (day < 10 ? "0" + day : day).toString();
        var result = vacationData[dateString];
        if (result === "1") {
            return "rest";
        }
        else if (result === "2") {
            return "work";
        }
        else {
            return "";
        }
    }
    function getJieri(lYear, lMonth, lDay, sYear, sMonth, sDay) {
        lYear = parseInt(lYear, 10);
        sYear = parseInt(sYear, 10);
        sMonth += 1;
        var lDateString = (lMonth < 10 ? "0" + lMonth : lMonth.toString()) + (lDay < 10 ? "0" + lDay : lDay.toString());
        var sDateString = (sMonth < 10 ? "0" + sMonth : sMonth.toString()) + (sDay < 10 ? "0" + sDay : sDay.toString());
        var jieriList = [];
        var sJieriList = festivalData.S[sDateString];
        if (sJieriList && sJieriList.length > 0) {
            for (var i = 0; i < sJieriList.length; i++) {
                if (sYear >= parseInt(sJieriList[i].Y, 10) && parseInt(sJieriList[i].P, 10) >= 3) {
                    jieriList.push(sJieriList[i]);
                }
            }
        }
        var lJieriList = festivalData.L[lDateString];
        if (lJieriList && lJieriList.length > 0) {
            for (var i = 0; i < lJieriList.length; i++) {
                if (lYear >= parseInt(lJieriList[i].Y, 10) && parseInt(lJieriList[i].P, 10) >= 3) {
                    jieriList.push(lJieriList[i]);
                }
            }
        }
        var wDateString = getWeekIndexString(sYear, sMonth, sDay);
        var wJieriList = festivalData.W[wDateString];
        if (wJieriList && wJieriList.length > 0) {
            for (var i = 0; i < wJieriList.length; i++) {
                if (sYear >= parseInt(wJieriList[i].Y, 10) && parseInt(wJieriList[i].P, 10) >= 3) {
                    jieriList.push(wJieriList[i]);
                }
            }
        }
        if (jieriList.length > 0) {
            jieriList.sort(function (a, b) {
                a = parseInt(a.P, 10);
                b = parseInt(b.P, 10);
                if (a === b) {
                    return 0;
                }
                else {
                    return a < b ? 1 : -1;
                }
            });
            return jieriList[0];
        }
        if (isEaster(sYear, sMonth, sDay)) {
            return {V: "复活节", P: "6", Y: "2018"}
        } 
        var hanshu = isHanshu(new Date(sYear, sMonth - 1, sDay))
        if (!!hanshu){
            return {V: hanshu, P: "3", Y: sYear}
        }
        return "";
    }
    function getWeekIndexString(year, month, day) {
        var weekIndex = Math.ceil(day / 7);
        var week = new Date(year, (month - 1), day).getDay();
        var weekString = (month < 10 ? "0" + month : month.toString()) + weekIndex + week;
        return weekString;
    }
    $(".jieriBtn").click(function () {
        $(".vacationContent").removeClass("hidden");
    });
    $(".fangjiaBtn").click(function () {
        $(".fangjiaContent").removeClass("hidden");
    });
    $(".jieriColumn").click(function () {
        $(".vacationContent").addClass("hidden");
        var year = parseInt($(this).data("year"));
        var month = parseInt($(this).data("month")) - 1;
        var day = parseInt($(this).data("day"));
        dateCurrent = new Date(year, month, day);
        $(".dateTxt").html(year + "年" + (month + 1) + "月");
        $(".monthDayList .day").detach();
        createMonthDayList(dateCurrent);
    });
    $(".jieqiBtn").click(function () {
        initJieqiDate(dateCurrent.getFullYear());
        $(".jieqiContent").removeClass("hidden");
    });
    function initJieqiDate(year) {
        var year = (new Date()).getFullYear();
        $(".jieqiYear").html(year + "年");
        if (year >= 2010 && year <= 2030) {
            for (var i = 0; i < JQYearDate[year].length; i++) {
                var startDate = new Date(year, 0, 1);
                startDate.setDate(startDate.getDate() + JQYearDate[year][i]);
                var jieqiMonth = startDate.getMonth(), jieqiDay = startDate.getDate();
                var $jieqiDay = $(".jieqiLine .jieqiDay:eq(" + ((i + 22)%24) + ")");
                $jieqiDay.data("year", i > 2 ? year : year + 1);
                $jieqiDay.data("month", jieqiMonth);
                $jieqiDay.data("day", jieqiDay);
                $jieqiDay.html((jieqiMonth + 1) + "月" + jieqiDay + "日");
            }
        }
        else {
            $(".jieqiLine .jieqiDay").html("暂无数据");
        }
    }
    $(".jieqiItemLink").click(function () {
        $(".jieqiContent").addClass("hidden");
        var $jieqiDay = $(this).find(".jieqiDay");
        var year = parseInt($jieqiDay.data("year"));
        var month = parseInt($jieqiDay.data("month"));
        var day = parseInt($jieqiDay.data("day"));
        dateCurrent = new Date(year, month, day);
        $(".dateTxt").html(year + "年" + (month + 1) + "月");
        $(".monthDayList .day").detach();
        createMonthDayList(dateCurrent);
    });
    for (var i = 0; i < 60; i++) {
        $(".addRemindMinuteSelect").append('<option value="' + i + '">' + i + '分</option>');
    }
    $(document).on("click", ".day", function () {
        var $this = $(this);
        if ($this.hasClass("now")) {
            if($this.hasClass("expand") || $this.hasClass("active")){
                return;
            } else {
                $('.now.expand').remove();
            }
            var year = $(this).data("year");
            var month = $(this).data("month");
            var day = $(this).data("day");
            // 取消展示提醒列表
            // if ($this.hasClass("active") && $this.find(".dayRemindContent").length > 0) {
            //     $this.find(".dayRemindListContent").trigger("click");
            // }
            if(!year || (!month&&month!==0) || !day){
                year = parseInt($(this).attr('dataset-year'));
                month = parseInt($(this).attr('dataset-month'));
                day = parseInt($(this).attr('dataset-day')); 
                $(this).data("year", year);
                $(this).data("month", month);
                $(this).data("day", day);
            }
            $(".day").removeClass("active");
            $this.addClass("active");
            if($this.hasClass('today')){
                if($('.todayBtn').css('visibility') !== 'hidden'){
                    $('.todayBtn').css('visibility', 'hidden');
                }
            } else {
                $('.todayBtn').css('visibility', '');
            }
            setDayViewInfo(year, month, day);
        }
        else if ($this.hasClass("next")) {
            // dateCurrent.setDate(1);
            // dateCurrent.setMonth(dateCurrent.getMonth() + 1);
            // yearNow = dateCurrent.getFullYear();
            // monthNow = dateCurrent.getMonth();
            // dayNow = dateCurrent.getDate();
            // $(".dateTxt").html(yearNow + "年" + (monthNow + 1) + "月");
            // $(".monthDayList .day").detach();
            // createMonthDayList(dateCurrent);
            $('.nextBtn').trigger('click');
        }
        else if ($this.hasClass("last")) {
            // dateCurrent.setDate(1);
            // dateCurrent.setMonth(dateCurrent.getMonth() - 1);
            // yearNow = dateCurrent.getFullYear();
            // monthNow = dateCurrent.getMonth();
            // dayNow = dateCurrent.getDate();
            // $(".dateTxt").html(yearNow + "年" + (monthNow + 1) + "月");
            // $(".monthDayList .day").detach();
            // createMonthDayList(dateCurrent);
            $('.prevBtn').trigger('click');
        }
    });
    $(document).on("mouseenter", ".now", function (e) {
        $('.addRemindDesc').remove();
        $(e.currentTarget).find(".dayRemindListContent").after('<div class="addRemindDesc">新增提醒...</div>');
    });
    // $(document).on("mouseleave", ".now", function (e) {
    //     $('.addRemindDesc').remove();
    // });
    $(document).on("click", ".addRemindDesc", function (e) {
        $('.addRemindDesc').removeClass('active');
        $('.dayRemindContent').removeClass('active');
        $(e.currentTarget).addClass('active');
        if (!userLocalData) {
            alert("请先登录后添加提醒");
            return false;
        }
        var dom = $(e.currentTarget).parent().parent().parent()[0];
        $dom = $(dom);
        var $tempdom;
        if(!$dom.hasClass('expand')){
            $('.day.active').removeClass('active');
            $(dom).addClass('active');
            $tempdom = $(e.currentTarget);
            if($tempdom.offset().left > 0.6 * $(document).width()) {
                Position.set({d:'right', x: $tempdom.offset().left - 360,y: $tempdom.offset().top - 104});
            } else {
                Position.set({d:'left', x: $tempdom.offset().left + $tempdom.width() ,y: $tempdom.offset().top - 104})
            }
            if($tempdom.offset().top > 0.9 * $(document).height()) {
                Position.grouth(0.9);
            } else if($tempdom.offset().top > 0.8 * $(document).height()) {
                Position.grouth(0.7);
            } else if($tempdom.offset().top > 0.7 * $(document).height()) {
                Position.grouth(0.5);
            }
            $('.now.expand').remove();
        } else {
            // $tempdom = $('.active.now').eq(0).find('.dayRemindListContent');
            $tempdom = $(e.currentTarget);
            if($tempdom.offset().left > 0.6 * $(document).width()) {
                Position.set({d:'right', x: $tempdom.offset().left - 360,y: $tempdom.offset().top - 104});
            } else {
                Position.set({d:'left', x: $tempdom.offset().left + $tempdom.width() ,y: $tempdom.offset().top - 104})
            }
            if($tempdom.offset().top > 0.9 * $(document).height()) {
                Position.grouth(0.9);
            } else if($tempdom.offset().top > 0.8 * $(document).height()) {
                Position.grouth(0.7);
            } else if($tempdom.offset().top > 0.7 * $(document).height()) {
                Position.grouth(0.5);
            }
        }
        if ($(".addRemindContent").hasClass("initial")) {
            $(".addRemindContent").removeClass("initial");
        }
        $(".addRemindContent").removeClass("hidden");
        
        // var clientX = e.clientX + $(document).scrollLeft();
        // var clientY = e.clientY + $(document).scrollTop();
        // var $addRemindDiv = $(".addRemindDiv");
        // var contentTop = (clientY - $addRemindDiv.height() / 2) > 0 ? (clientY - $addRemindDiv.height() / 2) : 0;
        // $addRemindDiv.css("top", contentTop + "px");
        // var contentLeft = 0;
        // if ((clientX + 20 + $addRemindDiv.width()) > $window.width()) {
        //     contentLeft = clientX - $addRemindDiv.width() - 20;
        //     $(".boxArrowLfet").addClass("hidden");
        //     $(".boxArrowRight").removeClass("hidden");
        //     $(".boxArrowRight").css("top", (contentTop + $addRemindDiv.height() / 2 - 14) + "px");
        //     $(".boxArrowRight").css("left", (contentLeft + $addRemindDiv.width() - 15) + "px");
        // }
        // else {
        //     contentLeft = clientX + 20;
        //     $(".boxArrowLfet").removeClass("hidden");
        //     $(".boxArrowRight").addClass("hidden");
        //     $(".boxArrowLfet").css("top", (contentTop + $addRemindDiv.height() / 2 - 14) + "px");
        //     $(".boxArrowLfet").css("left", (contentLeft - 22) + "px");
        // }
        // $addRemindDiv.css("left", contentLeft + "px");

        $(".moreEditLink").removeClass("hidden");
        $(".moreEditContent").addClass("hidden");
        //需要设置为初始值
        resetRemindDetail();
        var year = $(this).parent().parent().parent(".day").data("year");
        var month = $(this).parent().parent().parent(".day").data("month");
        var day = $(this).parent().parent().parent(".day").data("day");
        // console.log($(this).parent().parent().parent('.day'));
        initDateSelect(new Date(year, month, day));
        $(".deleteBtn").addClass("hidden");

        $(".remindTxt").focus();
        makeExpandingArea(document.querySelector('.remindTxt'));
        Position.get();
        return false;
    });
    $(".contentMask").click(function () {
        $('.dayRemindContent').removeClass('active');
        $('.addRemindDesc').removeClass('active');
        $(this).parent(".modal").addClass("hidden");
    });
    var isAllDay = false;
    $(".allDayRadio").click(function () {
        if (!isAllDay) {
            $(this).css("background-image", "url('img_new/radio-ok.png')");
            isAllDay = true;
        }
        else if (isAllDay) {
            $(this).css("background-image", "url('img_new/radio-no.png')");
            isAllDay = false;
        }
    });
    var $dateControl = $(".remindDateControl");
    $(".lunarSelect").on("change", function () {
        var selectedOption = $(".lunarSelect option:selected");
        $(".lunarUISselect .selectTxt").html(selectedOption.html());
        var lumarSelect = $(this).val();
        if (lumarSelect === "0") {
            $dateControl.removeClass("hidden");
            $(".lunarDateContent").addClass("hidden");
            $(".remindTimeContent .selectTxt").removeClass("scale");
            $repeatMonthSselect = $(".repeatMonthSelect"), $repeatDaySselect = $(".repeatDaySelect");
            var repeattype = 0, $repeatTipTxt = $(".repeatTipTxt");
            $repeatMonthSselect.empty();
            for (var i = 1; i <= 11; i++) {
                $repeatMonthSselect.append('<option value="' + i + '">每' + i + '个月</option>');
            }
            for (var i = 1; i <= 365; i++) {
                $repeatDaySselect.append('<option value="' + i + '">每' + i + '天</option>');
            }
            $repeatMonthSselect.change(function () {
                var selectedOption = $(".repeatMonthSelect option:selected");
                $(".repeatMonthUISselect .selectTxt").html(selectedOption.html());
                $repeatTipTxt.html(selectedOption.html() === "每12个月" ? "每年" : selectedOption.html());
                repeattype = 2000 + parseInt($repeatMonthSselect.val());
            });
            $repeatDaySselect.change(function () {
                var selectedOption = $(".repeatDaySelect option:selected");
                $(".repeatDayUISselect .selectTxt").html(selectedOption.html());
                $repeatTipTxt.html(selectedOption.html());
                repeattype = 3000 + parseInt(selectedOption.val());
            });
            $repeatMonthSselect.val(1);
        }
        else {
            $dateControl.addClass("hidden");
            $(".lunarDateContent").removeClass("hidden");
            $(".remindTimeContent .selectTxt").addClass("scale");
            $repeatMonthSselect.empty();
            $repeatMonthSselect.append('<option value="1">每1个月</option>');
            $repeatMonthSselect.val(1);
            $repeatMonthSselect.trigger("change");
        }
    });
    var tempStartPickDate;
    var $sYear = $(".sYear"), $sMonth = $(".sMonth"), $sDay = $(".sDay");
    var $lunarYear = $(".lunarYear"), $lunarMonth = $(".lunarMonth"), $lunarDay = $(".lunarDay");
    function initDateSelect(dateObj) {
        $(".lunarSelect").val("0");
        $dateControl.removeClass("hidden");
        $(".lunarDateContent").addClass("hidden");

        var dateNow = new Date();

        $sYear.empty();
        for (var i = 1900; i <= 2050; i++) {
            $sYear.append('<option value="' + i + '">' + i + '年</option>')
        }
        $sYear.val(dateObj.getFullYear());
        $sMonth.empty();
        for (var i = 1; i < 13; i++) {
            $sMonth.append('<option value="' + (i - 1) + '">' + i + '月</option>');
        }
        $sMonth.val(dateObj.getMonth());
        var sMonthDayCount = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate();
        $sDay.empty();
        for (var ld = 1; ld < sMonthDayCount + 1; ld++) {
            $sDay.append("<option value='" + ld + "' >" + ld + "日</option> ");
        }
        $sDay.val(dateObj.getDate());
        $sYear.trigger("change");
        $sMonth.trigger("change");
        $sDay.trigger("change");

        $(".addRemindHourSelect").val(dateNow.getHours());
        $(".hourUISselect .selectTxt").html(dateNow.getHours() + "时");
        $(".addRemindMinuteSelect").val(dateNow.getMinutes());
        $(".minuteUISselect .selectTxt").html(dateNow.getMinutes() + "分");

        var lunarDate = new Lunar(dateObj);
        $lunarYear.empty();
        for (var i = 1900; i <= 2050; i++) {
            $lunarYear.append('<option value="' + i + '">' + i + '年</option>')
        }
        $lunarYear.val(lunarDate.year);
        var monthselected = lunarDate.month;
        if (lunarDate.isLeap) {
            monthselected = "13";
        }
        var leapmonth = leapMonth(lunarDate.year);
        $lunarMonth.empty();
        for (var i = 1; i < 13; i++) {
            $lunarMonth.append('<option value="' + i + '">' + monthName[i - 1] + '</option>');
            if (i === leapmonth) {
                $lunarMonth.append('<option value="13">闰' + monthName[i - 1] + '</option>');
            }
        }
        $lunarMonth.val(monthselected);
        var selectedLunarDayCounts = monthDays(lunarDate.year, lunarDate.month);
        $lunarDay.empty();
        for (var ld = 1; ld < selectedLunarDayCounts + 1; ld++) {
            $lunarDay.append("<option value='" + ld + "' >" + cDay(ld) + "</option> ");
        }
        $lunarDay.val(lunarDate.day);
        $lunarYear.trigger("change");
        $lunarMonth.trigger("change");
        $lunarDay.trigger("change");
    }
    $(".addRemindHourSelect").on("change", function () {
        var selectedOption = $(".addRemindHourSelect option:selected");
        $(".hourUISselect .selectTxt").html(selectedOption.html());
    });
    $(".addRemindMinuteSelect").on("change", function () {
        var selectedOption = $(".addRemindMinuteSelect option:selected");
        $(".minuteUISselect .selectTxt").html(selectedOption.html());
    });
    $sYear.change(function () {
        var selectedOption = $(".sYear option:selected");
        $(".sYearUISselect .selectTxt").html(selectedOption.html());
        var selectedYear = parseInt($sYear.val());
        var selectedMonth = parseInt($sMonth.val());
        var selectedDay = parseInt($sDay.val());
        var sMonthDayCount = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        $sDay.empty();
        for (var ld = 1; ld < sMonthDayCount + 1; ld++) {
            $sDay.append("<option value='" + ld + "' >" + ld + "日</option> ");
        }
        $sDay.val(selectedDay > sMonthDayCount ? 1 : selectedDay);
        $sDay.trigger("change");
    });
    $sMonth.change(function () {
        var selectedOption = $(".sMonth option:selected");
        var selectedHtml = selectedOption.html();
        $(".sMonthUISselect .selectTxt").html(selectedHtml);
        var selectedYear = parseInt($sYear.val());
        var selectedMonth = parseInt($sMonth.val());
        var selectedDay = parseInt($sDay.val());
        var sMonthDayCount = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        $sDay.empty();
        for (var ld = 1; ld < sMonthDayCount + 1; ld++) {
            $sDay.append("<option value='" + ld + "' >" + ld + "日</option> ");
        }
        $sDay.val(selectedDay > sMonthDayCount ? 1 : selectedDay);
        $sDay.trigger("change");
    });
    $sDay.change(function () {
        var selectedOption = $(".sDay option:selected");
        $(".sDayUISselect .selectTxt").html(selectedOption.html());
    });
    $lunarYear.change(function () {
        var selectedOption = $(".lunarYear option:selected");
        $(".lunarYearUISselect .selectTxt").html(selectedOption.html());
        var selectedYear = parseInt($lunarYear.val());
        var selectedMonth = parseInt($lunarMonth.val());
        var leapmonth = leapMonth(selectedYear);
        if (selectedMonth === 13 && leapmonth === 0) {
            selectedMonth = 1;
        }
        $lunarMonth.empty();
        for (var i = 1; i < 13; i++) {
            $lunarMonth.append('<option value="' + i + '">' + monthName[i - 1] + '</option>');
            if (i === leapmonth) {
                $lunarMonth.append('<option value="13">闰' + monthName[i - 1] + '</option>');
            }
        }
        $lunarMonth.val(selectedMonth);
        $lunarMonth.trigger("change");
    });
    $lunarMonth.change(function () {
        var selectedOption = $(".lunarMonth option:selected");
        var selectedHtml = selectedOption.html();
        selectedHtml = selectedHtml.length > 2 ? selectedHtml.substr(0, selectedHtml.length - 1) : selectedHtml;
        $(".lunarMonthUISselect .selectTxt").html(selectedHtml);
        var selectedYear = parseInt($lunarYear.val());
        var selectedMonth = parseInt($lunarMonth.val());
        var selectedDay = parseInt($lunarDay.val());
        var selectedLunarDayCounts = monthDays(selectedYear, selectedMonth);
        $lunarDay.empty();
        for (var ld = 1; ld < selectedLunarDayCounts + 1; ld++) {
            $lunarDay.append("<option value='" + ld + "' >" + cDay(ld) + "</option> ");
        }
        $lunarDay.val(selectedDay);
        $lunarDay.trigger("change");
    });
    $lunarDay.change(function () {
        var selectedOption = $(".lunarDay option:selected");
        $(".lunarDayUISselect .selectTxt").html(selectedOption.html());
    });
    $(".moreEditLink").click(function () {
        if(parseInt($('.moreEditLink').offset().top) > 0.9 * parseInt($(document).height())){
            Position.grouth(1.2);
        } else if(parseInt($('.moreEditLink').offset().top) > 0.8 * parseInt($(document).height())){
            Position.grouth(1.1);
        } else if(parseInt($('.moreEditLink').offset().top) > 0.7 * parseInt($(document).height())){
            Position.grouth(1.0);
        } else {
            // console.log(parseInt($('.moreEditLink').offset().top))
            // console.log(0.66 * parseInt($(document).height()))
        }
        $(this).addClass("hidden");
        $(".moreEditContent").removeClass("hidden");

    });
    var headObj = { "head1": 0, "head2": 0, "head3": 0, "head4": 0, "head5": 0, "head6": 0 };
    $(".preveTip1").click(function () {
        $(".prevSlideNav").slideToggle(300);
        if (headObj.head6 !== 0 && !$(".deleteBtn").hasClass("hidden")) {
            if ($(".prevSlidePanel").css("display") === "none") {
                $(".prevSlidePanel").slideDown(300);
            }
            else {
                $(".prevSlidePanel").slideUp(0);
            }
        }
        else {
            $(".prevSlidePanel").slideUp(0);
        }
    });
    var $customerDaySelect = $(".customerDaySelect"), $customerHourSelect = $(".customerHourSelect"), $customerMinSelect = $(".customerMinSelect");
    for (var i = 0; i <= 365; i++) {
        $customerDaySelect.append('<option value="' + i + '">' + i + '天</option>');
    }
    for (var i = 0; i <= 23; i++) {
        $customerHourSelect.append('<option value="' + i + '">' + i + '时</option>');
    }
    for (var i = 1; i <= 59; i++) {
        $customerMinSelect.append('<option value="' + i + '">' + i + '分</option>');
    }
    $customerDaySelect.change(function () {
        var selectedOption = $(".customerDaySelect option:selected");
        $(".customerDayUISselect .selectTxt").html(selectedOption.html());
        headObj.head6 = parseInt($customerDaySelect.val()) * 1440 * 60 + parseInt($customerHourSelect.val()) * 60 * 60 + parseInt($customerMinSelect.val()) * 60;
    });
    $customerHourSelect.change(function () {
        var selectedOption = $(".customerHourSelect option:selected");
        $(".customerHourUISselect .selectTxt").html(selectedOption.html());
        headObj.head6 = parseInt($customerDaySelect.val()) * 1440 * 60 + parseInt($customerHourSelect.val()) * 60 * 60 + parseInt($customerMinSelect.val()) * 60;
    });
    $customerMinSelect.change(function () {
        var selectedOption = $(".customerMinSelect option:selected");
        $(".customerMinUISselect .selectTxt").html(selectedOption.html());
        headObj.head6 = parseInt($customerDaySelect.val()) * 1440 * 60 + parseInt($customerHourSelect.val()) * 60 * 60 + parseInt($customerMinSelect.val()) * 60;
    });
    $customerDaySelect.val(0);
    $customerDaySelect.trigger("change");
    $customerHourSelect.val(0);
    $customerHourSelect.trigger("change");
    $customerMinSelect.val(1);
    $customerMinSelect.trigger("change");

    var $preveTipTxt = $(".preveTipTxt1");
    $(".prevTimeLink6").click(function () {
        $(".prevSlidePanel").slideToggle(300);
        $(".customerDaySelect").val(0);
        $(".customerHourSelect").val(0);
        $(".customerMinSelect").val(1);
        if ($(this).hasClass("active")) {
            headObj.head6 = 0;
        }
        else {
            headObj.head6 = parseInt($(".customerDaySelect").val()) * 1440 * 60 + parseInt($(".customerHourSelect").val()) * 60 * 60 + parseInt($(".customerMinSelect").val()) * 60;
        }
    });
    $(".prevSlideNav a").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            //if($(this).hasClass("prevTimeLink6")){
            //   headObj.head6=0;
            //}
            //else{
            //   headObj["head"+$(this).data("index")]=0;
            //}
            headObj["head" + $(this).data("index")] = 0;
            if ($(".prevSlideNav a.active").length > 1) {
                $preveTipTxt.html("多次提醒");
                //$preveTipTxt.addClass("multiple");
            }
            else if ($(".prevSlideNav a.active").length === 1) {
                $preveTipTxt.html($(".prevSlideNav a.active").data("string"));
                //$preveTipTxt.addClass("multiple");
            }
            else {
                $preveTipTxt.html("不提前提醒");
            }
        }
        else {
            if ($(".prevSlideNav a").hasClass("active")) {
                $preveTipTxt.html("多次提醒");
                //$preveTipTxt.addClass("multiple");
            }
            else {
                $preveTipTxt.html($(this).data("string"));
                //$preveTipTxt.removeClass("multiple");
            }
            $(this).addClass("active");
            headObj["head" + $(this).data("index")] = parseInt($(this).data("time")) * 60;
        }
    });

    var $repeatMonthSselect = $(".repeatMonthSelect"), $repeatDaySselect = $(".repeatDaySelect");
    var repeattype = 0, $repeatTipTxt = $(".repeatTipTxt");
    $repeatMonthSselect.empty();
    for (var i = 1; i <= 11; i++) {
        $repeatMonthSselect.append('<option value="' + i + '">每' + i + '个月</option>');
    }
    for (var i = 1; i <= 365; i++) {
        $repeatDaySselect.append('<option value="' + i + '">每' + i + '天</option>');
    }
    $repeatMonthSselect.change(function () {
        var selectedOption = $(".repeatMonthSelect option:selected");
        $(".repeatMonthUISselect .selectTxt").html(selectedOption.html());
        $repeatTipTxt.html(selectedOption.html() === "每12个月" ? "每年" : selectedOption.html());
        repeattype = 2000 + parseInt($repeatMonthSselect.val());
    });
    $repeatDaySselect.change(function () {
        var selectedOption = $(".repeatDaySelect option:selected");
        $(".repeatDayUISselect .selectTxt").html(selectedOption.html());
        $repeatTipTxt.html(selectedOption.html());
        repeattype = 3000 + parseInt(selectedOption.val());
    });
    $repeatMonthSselect.val(1);
    var selectedOption = $(".repeatMonthSelect option:selected");
    $(".repeatMonthUISselect .selectTxt").html(selectedOption.html());
    $repeatDaySselect.val(1);
    selectedOption = $(".repeatDaySelect option:selected");
    $(".repeatDayUISselect .selectTxt").html(selectedOption.html());
    $(".repeatTip").click(function () {
        $(".repeatSlideNav").slideToggle(300);
        var repeatTypeFirstCode = repeattype.toString().substr(0, 1);
        if (!$(".deleteBtn").hasClass("hidden")) {
            if (repeatTypeFirstCode === "0" || repeatTypeFirstCode === "1") {
                $(".repeatWeekContent").slideUp(0);
                $(".repeatDayContent").slideUp(0);
                $(".repeatMonthContent").slideUp(0);
            }
            else if (repeatTypeFirstCode === "2") {
                $(".repeatWeekContent").slideUp(0);
                $(".repeatDayContent").slideUp(0);
                if ($(".repeatMonthContent").css("display") === "none") {
                    $(".repeatMonthContent").slideDown(300);
                }
                else {
                    $(".repeatMonthContent").slideUp(0);
                }
            }
            else if (repeatTypeFirstCode === "3") {
                $(".repeatWeekContent").slideUp(0);
                if ($(".repeatDayContent").css("display") === "none") {
                    $(".repeatDayContent").slideDown(300);
                }
                else {
                    $(".repeatDayContent").slideUp(0);
                }
                $(".repeatMonthContent").slideUp(0);
            }
            else if (repeatTypeFirstCode === "4") {
                if ($(".repeatWeekContent").css("display") === "none") {
                    $(".repeatWeekContent").slideDown(300);
                }
                else {
                    $(".repeatWeekContent").slideUp(0);
                }
                $(".repeatDayContent").slideUp(0);
                $(".repeatMonthContent").slideUp(0);
            }
        }
        else {
            $(".repeatWeekContent").slideUp(0);
            $(".repeatDayContent").slideUp(0);
            $(".repeatMonthContent").slideUp(0);
        }
    });
    $(".yearRepeatLnk").click(function () {
        $(".repeatWeekContent").slideUp(300);
        $(".repeatDayContent").slideUp(300);
        $(".repeatMonthContent").slideUp(300);
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $repeatTipTxt.html("不重复提醒");
            repeattype = 0;
        }
        else {
            $(".repeatSlideNav a").removeClass("active");
            $(this).addClass("active");
            $repeatTipTxt.html("每年");
            repeattype = 1000;
        }
    });
    $(".monthRepeatLnk").click(function () {
        $(".repeatWeekContent").slideUp(0);
        $(".repeatDayContent").slideUp(0);
        $(".repeatMonthContent").slideToggle(300);
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $repeatTipTxt.html("不重复提醒");
            repeattype = 0;
        }
        else {
            $(".repeatSlideNav a").removeClass("active");
            $(this).addClass("active");
            var selectedOption = $(".repeatMonthSelect option:selected");
            $repeatTipTxt.html(selectedOption.html());
            repeattype = 2000 + parseInt($repeatMonthSselect.val());
        }
    });
    $(".weekRepeatLnk").click(function () {
        $(".repeatMonthContent").slideUp(0);
        $(".repeatDayContent").slideUp(0);
        $(".repeatWeekContent").slideToggle(300);
        if ($(this).hasClass("active")) {
            repeattype = 0;
            $(this).removeClass("active");
            $repeatTipTxt.html("不重复提醒");
        }
        else {
            $(".repeatSlideNav a").removeClass("active");
            $(this).addClass("active");
            if ($(".repeatSecondItem a.active").length === 0) {
                $(".repeatWeekLink7").addClass("active");
            }
            var weekString = "";
            repeattype = 4000;
            $(".repeatSecondItem a.active").each(function () {
                weekString += $(this).html() + ",";
                repeattype += Math.pow(2, parseInt($(this).data("index")));
            });
            $repeatTipTxt.html(weekString.substr(0, weekString.length - 1));
        }
    });
    $(".repeatSecondItem a").click(function () {
        repeattype = 4000;
        var weekString = "";
        if ($(this).hasClass("active")) {
            if ($(".repeatSecondItem a.active").length === 1) {
                return false;
            }
            $(this).removeClass("active");
        }
        else {
            $(this).addClass("active");
        }
        $(".repeatSecondItem a.active").each(function () {
            weekString += $(this).html() + ",";
            repeattype += Math.pow(2, parseInt($(this).data("index")));
        });
        $repeatTipTxt.html(weekString.substr(0, weekString.length - 1));
    });
    $(".dayRepeatLnk").click(function () {
        $(".repeatMonthContent").slideUp(0);
        $(".repeatWeekContent").slideUp(0);
        $(".repeatDayContent").slideToggle(300);
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $repeatTipTxt.html("不重复提醒");
            repeattype = 0;
        }
        else {
            $(".repeatSlideNav a").removeClass("active");
            $(this).addClass("active");
            var selectedOption = $(".repeatDaySelect option:selected");
            $repeatTipTxt.html(selectedOption.html());
            repeattype = 3000 + parseInt(selectedOption.val());
        }
    });
    $(".cancelBtn").click(function () {
        $(".addRemindContent").addClass("hidden");
    });
    $(".editBtn").click(function(e){
        if(parseInt($('.editBtn').offset().top) > 0.8 * parseInt($(document).height())){
            Position.grouth(1.5);
        } else if(parseInt($('.editBtn').offset().top) > 0.7 * parseInt($(document).height())){
            Position.grouth(1.3);
        } else if(parseInt($('.editBtn').offset().top) > 0.6 * parseInt($(document).height())){
            Position.grouth(1.1);
        } else {
            // console.log(parseInt($('.editBtn').offset().top))
            // console.log(0.66 * parseInt($(document).height()))
        }
        $('.addRemindContent').removeClass('initial');
        $(".remindTxt").focus();
        makeExpandingArea(document.querySelector('.remindTxt'));
    });
    $(".saveBtn").click(function () {
        var status = 0;//新增
        var id = newGuid();
        var categoryid = 3;
        var timeStamp = Date.parse(new Date()) / 1000;
        var createdate = timeStamp;
        var $deleteBtn = $(".deleteBtn");
        if (!$deleteBtn.hasClass("hidden")) {
            status = 1;
            id = $deleteBtn.data("id");
            categoryid = parseInt($deleteBtn.data("categoryid"));
            createdate = $deleteBtn.data("createdate");
        }
        var remindTxt = $.trim($(".remindTxt").val());
        if (remindTxt.length === 0) {
            alert("请输入提醒内容");
            return false;
        }
        $(".loadingIcon").removeClass("hidden");
        var noteTxa = $.trim($(".noteTxa").val());

        var startDateStamp;
        var lunarSelect = parseInt($(".lunarSelect").val());
        //公历
        if (lunarSelect === 0) {
            tempStartPickDate = new Date($sYear.val(), $sMonth.val(), $sDay.val());
            tempStartPickDate.setHours(parseInt($(".addRemindHourSelect").val()));
            tempStartPickDate.setMinutes(parseInt($(".addRemindMinuteSelect").val()));
            startDateStamp = Date.parse(tempStartPickDate) / 1000;
        }
        else {
            // 农历时间戳
            tempStartPickDate = GetSolarDateFromLunar($lunarYear.val(), $lunarMonth.val(), $lunarDay.val());
            tempStartPickDate.setHours(parseInt($(".addRemindHourSelect").val()));
            tempStartPickDate.setMinutes(parseInt($(".addRemindMinuteSelect").val()));
            startDateStamp = Date.parse(tempStartPickDate) / 1000;
        }
        $.ajax({
            url: uploadDataUrl,
            type: "POST",
            headers: {
                "AccessToken": accessToken,
                "ClientName": clientName
            },
            beforeSend: function (request) {
                request.setRequestHeader("AccessToken", accessToken);
                request.setRequestHeader("ClientName", clientName);
            },
            data: {
                type: "0",
                data: JSON.stringify([{
                    id: id,
                    createdate: createdate,
                    lastupdatedate: timeStamp,
                    status: status,  // 状态值表明新增0，修改 1、删除 2
                    client: 3,   //  创建客户端
                    tdatetime: startDateStamp, //阴历转阳历
                    datetype: lunarSelect,   //时间类型阴历还是阳历
                    dateignore: 0,
                    needalarm: true,
                    alarmtype: 1,
                    alarmahead: headObj,
                    repeattype: repeattype,
                    repeatfrequently: 0,   // 重复平率（每3月重复）  不用
                    categoryid: categoryid,   //类别类型   自定义  3/生日
                    userid: userid,  //用户标示    用户id
                    isallday: isAllDay,
                    title: remindTxt,
                    note: noteTxa,
                    extra: "",
                    repeateenddate: "",
                    enddate: "",
                    favourite: false
                }])
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    $(".loadingIcon").addClass("hidden");
                    if (status === 0) {
                        $(".addRemindContent").addClass("hidden");
                    }
                    else {
                        $(".addRemindContent").addClass("hidden");
                        $(".remindListContent").addClass("hidden");
                    }
                    if (userLocalData) {
                        $(".searchInput").val("");
                        localReminderList = null;
                        $(".remindList").empty();
                        accessToken = userLocalData.AccessToken;
                        userid = userLocalData.ID;
                        getReminderList(accessToken, clientName, dateCurrent);
                    }
                    $('.dayRemindContent.active').text(remindTxt);
                    if(!$('.dayRemindContent.active').exist()) {
                        $('.expand.day').remove();
                    }
                }
                else {
                    alert("服务器异常,请重试");
                }
            },
            error: function (xhr, status, errorMsg) {
                alert(errorMsg)
            }
        });
    });
    $(document).on("click", ".remindTitleItem", function () {
        var id = $(this).data("id");
        for (var j = 0; j < localReminderList.length; j++) {
            if (id === localReminderList[j].id) {
                initEditRemindDetail(localReminderList[j]);
                break;
            }
        }
        $(".addRemindContent .contentMask").css("filter", "alpha(opacity=0.05)");
        $(".addRemindContent .contentMask").css("opacity", "0.05");
        $(".addRemindContent .contentMask").css("-moz-opacity", "0.05");
        $(".deleteBtn").removeClass("hidden");
        $(".addRemindContent").addClass("initial");
        // 先设置 再显示
        // $(".addRemindContent").removeClass("hidden");
        $(".remindTxt").focus();
        makeExpandingArea(document.querySelector('.remindTxt'));
        var parentRemindListPanel = $(this).parents(".remindListPanel");
        var clientX = parseInt(parentRemindListPanel.css("left")) + parentRemindListPanel.width();
        var clientY = parseInt(parentRemindListPanel.css("top")) + parentRemindListPanel.height() / 3;
        var $addRemindDiv = $(".addRemindDiv");
        var contentTop = (clientY + $addRemindDiv.height() + 10) > $window.height() ? ($window.height() - $addRemindDiv.height() - 90) : clientY - $addRemindDiv.height() / 2 + 10;
        contentTop = contentTop < 0 ? 0 : contentTop;
        $addRemindDiv.css("top", contentTop + "px");
        var contentLeft = 0;
        if ((clientX + $addRemindDiv.width()) > $window.width()) {
            contentLeft = clientX - $addRemindDiv.width() - parentRemindListPanel.width() - 10;
            $(".boxArrowLfet").addClass("hidden");
            $(".boxArrowRight").removeClass("hidden");
            $(".boxArrowRight").css("top", (contentTop + $addRemindDiv.height() / 2 - 14) + "px");
            $(".boxArrowRight").css("left", (contentLeft + $addRemindDiv.width() - 15) + "px");
        }
        else {
            contentLeft = clientX + 10;
            $(".boxArrowLfet").removeClass("hidden");
            $(".boxArrowRight").addClass("hidden");
            $(".boxArrowLfet").css("top", (contentTop + $addRemindDiv.height() / 2 - 14) + "px");
            $(".boxArrowLfet").css("left", (contentLeft - 22) + "px");
        }
        $addRemindDiv.css("left", contentLeft + "px");
        setTimeout(function(){
            Position.get();
        }, 100);
    });
    function initEditRemindDetail(remindObj) {
        $(".deleteBtn").data("id", remindObj.id);
        $(".deleteBtn").data("categoryid", remindObj.categoryid);
        $(".deleteBtn").data("createdate", remindObj.createdate);
        $(".moreEditLink").addClass("hidden");
        $(".moreEditContent").removeClass("hidden");
        //需要设置为初始值
        resetRemindDetail();
        $(".remindTxt").val(remindObj.title ? remindObj.title : '提醒');
        $('.initialTitle').text(remindObj.title ? remindObj.title : '提醒');
        isAllDay = remindObj.isallday;
        if (isAllDay) {
            $(".allDayRadio").css("background-image", "url('img_new/radio-ok.png')");
        }
        else {
            $(".allDayRadio").css("background-image", "url('img_new/radio-no.png')");
        }
        // 公历农历id
        var lumarSelect = remindObj.datetype;
        $(".lunarSelect").val(lumarSelect);
        $(".lunarSelect").trigger("change");
        // console.log(remindObj);
        var editStartDate = getLocalTime(remindObj.tdatetime);
        $sYear.empty();
        for (var i = 1900; i <= 2050; i++) {
            $sYear.append('<option value="' + i + '">' + i + '年</option>')
        }
        $sYear.val(editStartDate.getFullYear());
        $sMonth.empty();
        for (var i = 1; i < 13; i++) {
            $sMonth.append('<option value="' + (i - 1) + '">' + i + '月</option>');
        }
        $sMonth.val(editStartDate.getMonth());
        var sMonthDayCount = new Date(editStartDate.getFullYear(), editStartDate.getMonth() + 1, 0).getDate();
        $sDay.empty();
        for (var ld = 1; ld < sMonthDayCount + 1; ld++) {
            $sDay.append("<option value='" + ld + "' >" + ld + "日</option> ");
        }
        $sDay.val(editStartDate.getDate());
        var weekDays = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        $('.initialDate').text(editStartDate.getFullYear()+'年'+(editStartDate.getMonth()+1)+'月'+editStartDate.getDate()+'日 '+ weekDays[editStartDate.getDay()]);
        $sYear.trigger("change");
        $sMonth.trigger("change");
        $sDay.trigger("change");
        var lunarDate = new Lunar(editStartDate);
        for (var i = 1900; i <= 2050; i++) {
            $lunarYear.append('<option value="' + i + '">' + i + '年</option>')
        }
        $lunarYear.val(lunarDate.year);
        var monthselected = lunarDate.month;
        if (lunarDate.isLeap) {
            monthselected = "13";
        }
        var leapmonth = leapMonth(lunarDate.year);
        for (var i = 1; i < 13; i++) {
            $lunarMonth.append('<option value="' + i + '">' + monthName[i - 1] + '</option>');
            if (i === leapmonth) {
                $lunarMonth.append('<option value="13">闰' + monthName[i - 1] + '</option>');
            }
        }
        $lunarMonth.val(monthselected);
        var selectedLunarDayCounts = monthDays(lunarDate.year, lunarDate.month);
        for (var ld = 1; ld < selectedLunarDayCounts + 1; ld++) {
            $lunarDay.append("<option value='" + ld + "' >" + cDay(ld) + "</option> ");
        }
        $lunarDay.val(lunarDate.day);
        $lunarYear.trigger("change");
        $lunarMonth.trigger("change");
        $lunarDay.trigger("change");
        if (lumarSelect === 0) {
            $(".lunarSelect").val(0);
            $dateControl.removeClass("hidden");
            $(".lunarDateContent").addClass("hidden");
            $(".remindTimeContent .selectTxt").removeClass("scale");
        }
        else {
            $(".lunarSelect").val(1);
            $dateControl.addClass("hidden");
            $(".lunarDateContent").removeClass("hidden");
            $(".remindTimeContent .selectTxt").addClass("scale");
        }
        $(".addRemindHourSelect").val(editStartDate.getHours());
        $(".hourUISselect .selectTxt").html(editStartDate.getHours() + "时");
        $(".addRemindMinuteSelect").val(editStartDate.getMinutes());
        $(".minuteUISselect .selectTxt").html(editStartDate.getMinutes() + "分");
        // console.log(editStartDate)
        if(isAllDay){
            $('.initialTime').html('提醒:&nbsp;&nbsp;全天');
        } else {
            $('.initialTime').html('提醒:&nbsp;&nbsp;' + (editStartDate.getHours() > 9 ? editStartDate.getHours() : '0' + editStartDate.getHours()) + ":" + (editStartDate.getMinutes() > 9 ? editStartDate.getMinutes() : '0' + editStartDate.getMinutes()));
        }
        if (!remindObj.needalarm) {
            $(".prevContent").addClass("hidden");
        }
        var headCount = 0;
        if (remindObj.alarmahead.head1 && remindObj.alarmahead.head1 !== 0) {
            headObj.head1 = remindObj.alarmahead.head1;
            $(".prevTimeLink1").addClass("active");
            $(".preveTipTxt1").html("15分");
            headCount++;
        }
        if (remindObj.alarmahead.head2 && remindObj.alarmahead.head2 !== 0) {
            headObj.head2 = remindObj.alarmahead.head2;
            $(".prevTimeLink2").addClass("active");
            $(".preveTipTxt1").html("30分");
            headCount++;
        }
        if (remindObj.alarmahead.head3 && remindObj.alarmahead.head3 !== 0) {
            headObj.head3 = remindObj.alarmahead.head3;
            $(".prevTimeLink3").addClass("active");
            $(".preveTipTxt1").html("1小时");
            headCount++;
        }
        if (remindObj.alarmahead.head4 && remindObj.alarmahead.head4 !== 0) {
            headObj.head4 = remindObj.alarmahead.head4;
            $(".prevTimeLink4").addClass("active");
            $(".preveTipTxt1").html("1天");
            headCount++;
        }
        if (remindObj.alarmahead.head5 && remindObj.alarmahead.head5 !== 0) {
            headObj.head5 = remindObj.alarmahead.head5;
            $(".prevTimeLink5").addClass("active");
            $(".preveTipTxt1").html("3天");
            headCount++;
        }
        if (remindObj.alarmahead.head6 && remindObj.alarmahead.head6 !== 0) {
            headObj.head6 = remindObj.alarmahead.head6;
            $(".prevTimeLink6").addClass("active");
            $(".preveTipTxt1").html("自定");
            var minCount = Math.floor(((headObj.head6 % (1440 * 60)) % (60 * 60)) / 60);
            var hourCount = Math.floor((headObj.head6 % (1440 * 60)) / (60 * 60));
            var dayCount = Math.floor(headObj.head6 / (1440 * 60));
            $(".customerDaySelect").val(dayCount);
            $(".customerHourSelect").val(hourCount);
            $(".customerMinSelect").val(minCount);
            $(".customerDaySelect").trigger("change");
            $(".customerHourSelect").trigger("change");
            $(".customerMinSelect").trigger("change");
            headObj.head6 = remindObj.alarmahead.head6;
            headCount++;
        }
        if (headCount > 1) {
            $(".preveTipTxt1").html("多次提醒");
        }
        if (remindObj.categoryid !== "3") {
            $(".noteTxaContent").addClass("hidden");
        }
        switch (remindObj.categoryid) {
            //生日提醒  隐藏二级重复提醒
            case "4":
                $(".repeatSlidePanel").addClass("hidden");
                break;
            //银行还款,按月重复 12个月
            case "5":
                $(".repeatSlideNav").height(0);
                $(".yearRepeatLnk").addClass("hidden");
                $(".monthRepeatLnk").addClass("hidden");
                $(".weekRepeatLnk").addClass("hidden");
                $(".dayRepeatLnk").addClass("hidden");
                $repeatMonthSselect.append('<option value="12">每12个月</option>');
                break;
            //房租物业,按月重复 12个月
            case "6":
                $(".repeatSlideNav").height(0);
                $(".yearRepeatLnk").addClass("hidden");
                $(".monthRepeatLnk").addClass("hidden");
                $(".weekRepeatLnk").addClass("hidden");
                $(".dayRepeatLnk").addClass("hidden");
                $repeatMonthSselect.append('<option value="12">每12个月</option>');
                break;
            //每年提醒  隐藏二级重复提醒
            case "8":
                $(".repeatSlidePanel").addClass("hidden");
                break;
            //每月提醒  隐藏二级重复提醒
            case "9":
                $(".repeatSlidePanel").addClass("hidden");
                $(".lunarSelect option:last-child").remove();
                break;
            //每周提醒  按周重复
            case "10":
                $(".repeatSlideNav").height(0);
                $(".yearRepeatLnk").addClass("hidden");
                $(".monthRepeatLnk").addClass("hidden");
                $(".weekRepeatLnk").addClass("hidden");
                $(".dayRepeatLnk").addClass("hidden");
                break;
            //按月提醒,按月重复 12个月
            case "11":
                $(".repeatSlideNav").height(0);
                $(".yearRepeatLnk").addClass("hidden");
                $(".monthRepeatLnk").addClass("hidden");
                $(".weekRepeatLnk").addClass("hidden");
                $(".dayRepeatLnk").addClass("hidden");
                $repeatMonthSselect.append('<option value="12">每12个月</option>');
                break;
            //按天提醒,按天重复
            case "12":
                $(".repeatSlideNav").height(0);
                $(".yearRepeatLnk").addClass("hidden");
                $(".monthRepeatLnk").addClass("hidden");
                $(".weekRepeatLnk").addClass("hidden");
                $(".dayRepeatLnk").addClass("hidden");
                break;
        }
        repeattype = remindObj.repeattype;
        var repeatTypeFirstCode = remindObj.repeattype.toString().substr(0, 1);
        if (repeatTypeFirstCode === "0") {
            $(".repeatTipTxt").html("不重复提醒");
        }
        else if (repeatTypeFirstCode === "1") {
            $(".repeatSlideNav a").removeClass("active");
            $(".yearRepeatLnk").addClass("active");
            $(".repeatTipTxt").html("每年");
        }
        else if (repeatTypeFirstCode === "2") {
            $(".repeatSlideNav a").removeClass("active");
            $(".monthRepeatLnk").addClass("active");
            var repeatCount = remindObj.repeattype - 2000;
            $repeatMonthSselect.val(repeatCount);
            $repeatMonthSselect.trigger("change");
        }
        else if (repeatTypeFirstCode === "3") {
            $(".repeatSlideNav a").removeClass("active");
            $(".dayRepeatLnk").addClass("active");
            var repeatCount = remindObj.repeattype - 3000;
            $(".repeatDaySelect").val(repeatCount);
            $(".repeatDaySelect").trigger("change");
        }
        else if (repeatTypeFirstCode === "4") {
            $(".repeatSlideNav a").removeClass("active");
            $(".weekRepeatLnk").addClass("active");
            var weekList = ["日", "一", "二", "三", "四", "五", "六"];
            var weekString = "";
            for (var i = 0; i < weekList.length; i++) {
                var weekTag = Math.pow(2, i);
                if (((repeattype - 4000) & weekTag) === weekTag) {
                    weekString += "周" + weekList[i] + ",";
                    $(".repeatSecondItem a:eq(" + i + ")").addClass("active");
                }
            }
            weekString = weekString.substr(0, weekString.length - 1);
            $(".repeatTipTxt").html(weekString);
        }
        setTimeout(function(){
            if($.trim($('.repeatTipTxt').text()) && $.trim($('.repeatTipTxt').text()) !== '不重复提醒'){
                $('.initialRepeat').html('重复:&nbsp;&nbsp;'+$('.repeatTipTxt').text());
                $('.initialRepeat').removeClass('hidden');
            }
        }, 100);
        $(".noteTxa").val(remindObj.note);
        if($.trim(remindObj.note)) {
            $('.initialNote').removeClass('hidden');
            $('.initialNote').html('备注:&nbsp;&nbsp;'+remindObj.note);
        }
    }
    function resetRemindDetail() {
        $(".addRemindContent .contentMask").css("filter", "alpha(opacity=5)");
        $(".addRemindContent .contentMask").css("opacity", "0.05");
        $(".addRemindContent .contentMask").css("-moz-opacity", "0.05");
        $(".remindTxt").val("");
        $(".noteTxa").val("");
        isAllDay = false;
        $(".allDayRadio").css("background-image", "url('img_new/radio-no.png')");
        var $lunarSelect = $(".lunarSelect");
        $lunarSelect.empty();
        $lunarSelect.append('<option value="0">公历</option>');
        $lunarSelect.append('<option value="1">农历</option>');
        $lunarSelect.val(0);
        $lunarSelect.trigger("change");
        $(".prevSlidePanel").slideUp(0);
        $(".prevSlideNav").slideUp(0);
        headObj = { "head1": 0, "head2": 0, "head3": 0, "head4": 0, "head5": 0, "head6": 0 };
        $(".preveTipTxt1").html("不提前提醒");
        $(".prevSlideNav a").removeClass("active");
        $(".customerDaySelect").val(0);
        $(".customerDayUISselect .selectTxt").html("0天");
        $(".customerHourSelect").val(0);
        $(".customerHourUISselect .selectTxt").html("0时");
        $(".customerMinSelect").val(1);
        $(".customerMinUISselect .selectTxt").html("1分");

        $(".repeatSlidePanel").removeClass("hidden");

        $(".repeatSlideNav").height(45);
        $(".yearRepeatLnk").removeClass("hidden");
        $(".monthRepeatLnk").removeClass("hidden");
        $(".weekRepeatLnk").removeClass("hidden");
        $(".dayRepeatLnk").removeClass("hidden");
        $repeatMonthSselect.empty();
        for (var i = 1; i <= 11; i++) {
            $repeatMonthSselect.append('<option value="' + i + '">每' + i + '个月</option>');
        }
        $(".prevContent").removeClass("hidden");
        $(".repeatTipTxt").html("不重复提醒");
        $(".repeatSlideNav").slideUp(0);
        $(".repeatSecondItem").slideUp(0);
        repeattype = 0;
        $(".repeatSlideNav a").removeClass("active");
        $repeatMonthSselect.val(1);
        $(".repeatMonthUISselect .selectTxt").html("每1个月");
        $(".repeatSecondItem a").removeClass("active");
        $(".repeatDaySelect").val(1);
        $(".repeatDayUISselect .selectTxt").html("每1天");
        $(".noteTxaContent").removeClass("hidden");
        makeExpandingArea(document.querySelector('.remindTxt'));
    }
    function newGuid() {
        var guid = "";
        for (var i = 1; i <= 16; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
        }
        guid += new Date().getTime();
        return guid.toUpperCase();
    }
    $(".deleteBtn").click(function () {
        if (!confirm("是否确认删除?")) {
            return false;
        }
        renderListContent($('.active.now')[0]);
        var id = $(this).data("id");
        var categoryid = $(this).data("categoryid");
        var createdate = $(this).data("createdate");
        var remindTxt = $.trim($(".remindTxt").val());
        var noteTxa = $.trim($(".noteTxa").val());
        var timeStamp = Date.parse(new Date()) / 1000;
        var startDateStamp;
        var lunarSelect = parseInt($(".lunarSelect").val());
        //公历
        if (lunarSelect === 0) {
            tempStartPickDate = new Date($sYear.val(), $sMonth.val(), $sDay.val());
            tempStartPickDate.setHours(parseInt($(".addRemindHourSelect").val()));
            tempStartPickDate.setMinutes(parseInt($(".addRemindMinuteSelect").val()));
            startDateStamp = Date.parse(tempStartPickDate) / 1000;
        }
        else {
            // 农历时间戳
            tempStartPickDate = GetSolarDateFromLunar($(".lunarYear").val(), $(".lunarMonth").val(), $(".lunarDay").val());
            tempStartPickDate.setHours(parseInt($(".addRemindHourSelect").val()));
            tempStartPickDate.setMinutes(parseInt($(".addRemindMinuteSelect").val()));
            startDateStamp = Date.parse(tempStartPickDate) / 1000;
        }
        $.ajax({
            url: uploadDataUrl,
            type: "POST",
            headers: {
                "AccessToken": accessToken,
                "ClientName": clientName
            },
            beforeSend: function (request) {
                request.setRequestHeader("AccessToken", accessToken);
                request.setRequestHeader("ClientName", clientName);
            },
            data: {
                type: "0",
                data: JSON.stringify([{
                    id: id,
                    createdate: createdate,
                    lastupdatedate: timeStamp,
                    status: 2,  // 状态值表明新增0，修改 1、删除 2
                    client: 3,   //  创建客户端
                    tdatetime: startDateStamp, //阴历转阳历
                    datetype: lunarSelect,   //时间类型阴历还是阳历
                    dateignore: 0,
                    needalarm: true,
                    alarmtype: 1,
                    alarmahead: headObj,
                    repeattype: repeattype,
                    repeatfrequently: 0,   // 重复平率（每3月重复）  不用
                    categoryid: categoryid,   //类别类型   自定义  3/生日
                    userid: userid,  //用户标示    用户id
                    isallday: isAllDay,
                    title: remindTxt,
                    note: noteTxa,
                    extra: "",
                    repeateenddate: "",
                    enddate: "",
                    favourite: false
                }])
            },
            success: function (result) {
                result = JSON.parse(result);
                if (result.status) {
                    alert("删除成功");
                    $(".addRemindContent").addClass("hidden");
                    $(".remindListContent").addClass("hidden");
                    if (userLocalData) {
                        $(".searchInput").val("");
                        localReminderList = null;
                        $(".remindList").empty();
                        accessToken = userLocalData.AccessToken;
                        userid = userLocalData.ID;
                        getReminderList(accessToken, clientName, dateCurrent);
                    }
                    $('.dayRemindContent.active').remove();
                }
                else {
                    alert("服务器异常,请重试");
                }
            },
            error: function (xhr, status, errorMsg) {
                alert(errorMsg)
            }
        });
    });
    $(".contactLink").click(function () {
        $(".contactContent").removeClass("hidden");
    });
    $(".aboutLink").click(function () {
        $(".aboutContent").removeClass("hidden");
    });
});

function getQueryValue(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
function drawToast(message, is_lines) {
    var alert = document.getElementById('toast');
    if (alert.className.match(new RegExp('(\\s|^)' + 'show' + '(\\s|$)'))) {
        return false;
    }
    alert.className = alert.className.replace('lines', '');
    alert.style.opacity = .8;
    alert.innerHTML = message;
    var temp_alert = document.getElementById('toast1');
    temp_alert.innerHTML = message;
    alert.className += 'show';
    alert.style.marginLeft = '-' + temp_alert.offsetWidth / 2 + 'px';
    if (temp_alert.offsetWidth > window.innerWidth) {
        alert.className += ' lines';
    }
    if (is_lines) {
        alert.className += ' user_lines';
    }
    intervalCounter = setTimeout(function() {
        alert.style.opacity = 0;
        clearInterval(intervalCounter);
    }, 1500);
    setTimeout(function() {
        alert.className = alert.className.replace('show', '');
    }, 2000);
}
var httpProtocol = location.protocol;
if (httpProtocol.indexOf('http') < 0) {
    httpProtocol = 'https';
}
var uuid = '';
var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
Math.uuid = function(len, radix) {
    var chars = CHARS,
        uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    }
    else {
        // rfc4122, version 4 form
        var r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
};

function Utf8ToUnicode(strUtf8) {  
    var i,j;  
    var uCode;  
    var temp = new Array();  
      
    for(i=0,j=0; i<strUtf8.length; i++){  
        uCode = strUtf8.charCodeAt(i);  
        if(uCode<0x100){                 //ASCII字符  
            temp[j++] = 0x00;  
            temp[j++] = uCode;  
        }else if(uCode<0x10000){  
            temp[j++] = (uCode>>8)&0xff;  
            temp[j++] = uCode&0xff;  
        }else if(uCode<0x1000000){  
            temp[j++] = (uCode>>16)&0xff;  
            temp[j++] = (uCode>>8)&0xff;  
            temp[j++] = uCode&0xff;  
        }else if(uCode<0x100000000){  
            temp[j++] = (uCode>>24)&0xff;  
            temp[j++] = (uCode>>16)&0xff;  
            temp[j++] = (uCode>>8)&0xff;  
            temp[j++] = uCode&0xff;  
        }else{  
            break;  
        }  
    }  
    temp.length = j;  
    return temp;  
}  
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000);
}
//获取c_name的cookie值
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            var tempvalue = document.cookie.substring(c_start, c_end);
            try {
                tempvalue = decodeURIComponent(tempvalue);
            } catch(e){}
            return (unescape(tempvalue))
        }
    }
    return null;
}
//设置cookie
function setCookie(c_name, value, expireSeconds, cb) {
    var exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + Math.floor(expireSeconds / 60));
    document.cookie = c_name + "=" + escape(value) +
        ((expireSeconds == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/"
    if(cb!==undefined){
        cb();
    }
}
//移除Cookie,key为键
function removeCookie(key) {
    var d = new Date();
    if (getCookie(key)) {
        d.setTime(d.getTime() - (86400 * 1000 * 1));
        document.cookie = key + "=;expires=" + d.toGMTString();
    }
}
// 伸展textArea高度
function makeExpandingArea(el) {
    if(typeof $('.lt-ie9')[0] !== 'undefined'){
        return;
    }
    var setStyle = function(el) {
        el.style.height = el.scrollHeight + 'px';
        if(el.scrollHeight < 50) {
           el.style.height = '40px'; 
        } else if(el.scrollHeight > 98){
            el.style.height = '90px';
        }
        // console.log(el.scrollHeight);
    }
    var delayedResize = function(el) {
        window.setTimeout(function() {
            setStyle(el)
        },
        0);
    }
    if (el.addEventListener) {
        el.addEventListener('input',function() {
            setStyle(el)
        },false);
        setStyle(el)
    } else if (el.attachEvent) {
        el.attachEvent('onpropertychange',function() {
            setStyle(el)
        });
        setStyle(el)
    }
    if (window.VBArray && window.addEventListener) { //IE9
        el.attachEvent("onkeydown",function() {
            var key = window.event.keyCode;
            if (key == 8 || key == 46) delayedResize(el);

        });
        el.attachEvent("oncut",function() {
            delayedResize(el);
        }); //处理粘贴
    }
}

var Position = (function(){
    position = {};
    function set(p) {
        position.direction = p.d;
        position.x = p.x;
        position.y = p.y;
        position.by = p.y;
    }
    function grouth(N) {
        $('.addRemindDiv').css({
            top: position.y - 140 * N,
            left: position.x
        });
        $('.boxArrowLfet').css({
            top: position.by + 100,
            left: position.x - 22
        });
        position.y = position.y - 140 * N;
    }
    function get() {
        if(position.direction === 'left') {
            $('.addRemindDiv').css({
                top: position.y,
                left: position.x + 5
            });
            $('.boxArrowLfet').css({
                top: position.by + 100,
                left: position.x - 17
            })
            if(!$('.boxArrowRight').hasClass('hidden')){
                $('.boxArrowRight').addClass('hidden');
            }
            if($('.boxArrowLfet').hasClass('hidden')){
                $('.boxArrowLfet').removeClass('hidden');
            }
        } else {
            $('.addRemindDiv').css({
                top: position.y,
                left: position.x - 5
            });
            $('.boxArrowRight').css({
                top: position.by + 100,
                left: position.x + 338
            })
            if(!$('.boxArrowLfet').hasClass('hidden')){
                $('.boxArrowLfet').addClass('hidden');
            }
            if($('.boxArrowRight').hasClass('hidden')){
                $('.boxArrowRight').removeClass('hidden');
            }
        }
        if($('.addRemindContent').hasClass('hidden')){
            $('.addRemindContent').removeClass('hidden');
        }
    }
    return { get: get, set: set, grouth: grouth }
})();

function expand(dom, preDom, year, month, day){
    var height = $(preDom).height();
    var width = $(preDom).width();
    var top = $(preDom).position().top;
    var left = $(preDom).position().left;
    $(dom).addClass('active');
    $(dom).find('.dayContent').css('height', '');
    $(dom).css({
        height: height*1.5,
        width: width*1.5,
        top: top - parseInt(top)/9,
        left: left - parseInt(left)/12
    });
    $(dom).data('year', year);
    $(dom).data('month', month);
    $(dom).data('day', day);
    $(dom).find('.dayRemindListContent').height(height*1.5 - 90);
    try{
        $(dom).data("year", $('.active.day').data("year"));
        $(dom).data("month", $('.active.day').data("month"));
        $(dom).data("day", $('.active.day').data("day"));
    } catch(e) {
        // console.log(dom);
        // alert(dom.data('year'));
        // alert('error');
    }
    $(dom).css('display', '');
}
function isEaster(year, month, day) {
    var C = Math.floor(year / 100);
    var N = year - 19 * Math.floor(year / 19);
    var K = Math.floor((C - 17) / 25);
    var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I = I - 30 * Math.floor(I / 30);
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
    var J = year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4);
    J = J - 7 * Math.floor(J / 7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40) / 44);
    var D = L + 28 - 31 * Math.floor(M / 4);
    return month === M && day === D;
}

var win = window;
var doc = win.document;
var input = doc.createElement ("input");

var ie = (function (){
    //"!win.ActiveXObject" is evaluated to true in IE11
    if (win.ActiveXObject === undefined) return null;
    if (!win.XMLHttpRequest) return 6;
    if (!doc.querySelector) return 7;
    if (!doc.addEventListener) return 8;
    if (!win.atob) return 9;
    //"!doc.body.dataset" is faster but the body is null when the DOM is not
    //ready. Anyway, an input tag needs to be created to check if IE is being
    //emulated
    if (!input.dataset) return 10;
    return 11;
})();

(function($) {
    $.fn.exist = function(){ 
        if($(this).length>=1){
            return true;
        }
        return false;
    };
})(jQuery);



