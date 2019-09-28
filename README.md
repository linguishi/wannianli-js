### 获取万年历的日期信息
 - 法定节假日
 - 调休信息
 - 农历
 - 节气
 - 黄历

### 调用示例
##### 启动
```
node server.js
```
##### request
```
http://127.0.0.1:8081/getDateInfo?year=2019&month=10&date=1
```
##### response
```
{
    "festivalInfo": "国庆节 世界音乐日",
    "lumarInfo1": "九月初三 周二 ",
    "lumarInfo2": "己亥年 癸酉月 辛未日【属猪】",
    "isVacation": "rest",
    "huangli": {
        "yi": "诸事不宜",
        "ji": "交易 开业 安葬 入殓",
        "pzbj": "辛不合酱主人不尝 未不服药毒气入肠",
        "jsyq": "母仓 阴德 时阳 生气 天仓 不将 宝光",
        "xsyj": "五虚 九空 土符 复日",
        "wx": "路旁土",
        "cs": "羊日冲牛 煞西"
    }
}
```