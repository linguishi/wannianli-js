console.log('welcome to wannianli');

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

function setDayViewInfo(year, month, day) {
    var dayViewInfo = {};
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
    dayViewInfo['festivalInfo'] = jieriListString;
    //农历日期
    var monthCN = (chooseMonthLunarInfo[day - 1].isLeap ? '闰 ' : '') + monthName[chooseMonthLunarInfo[day - 1].lMonth - 1]
        + cDay(chooseMonthLunarInfo[day - 1].lDay);
    dayViewInfo['lumarInfo1'] = monthCN + " " + weekListString[dayViewDate.getDay()] + ' ';
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

