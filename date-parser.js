var jxData = require('./JXData.js');
var yjData = require('./YJData.js');

/**
 * Yovae.com
 */
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

vocationMsg = 'eyIyMDEzMDEwMSI6IjEiLCIyMDEzMDEwMiI6IjEiLCIyMDEzMDEwMyI6IjEiLCIyMDEzMDEwNSI6IjIiLCIyMDEzMDEwNiI6IjIiLCIyMDEzMDIwOSI6IjEiLCIyMDEzMDIxMCI6IjEiLCIyMDEzMDIxMSI6IjEiLCIyMDEzMDIxMiI6IjEiLCIyMDEzMDIxMyI6IjEiLCIyMDEzMDIxNCI6IjEiLCIyMDEzMDIxNSI6IjEiLCIyMDEzMDIxNiI6IjIiLCIyMDEzMDIxNyI6IjIiLCIyMDEzMDQwNCI6IjEiLCIyMDEzMDQwNSI6IjEiLCIyMDEzMDQwNiI6IjEiLCIyMDEzMDQwNyI6IjIiLCIyMDEzMDQyNyI6IjIiLCIyMDEzMDQyOCI6IjIiLCIyMDEzMDQyOSI6IjEiLCIyMDEzMDQzMCI6IjEiLCIyMDEzMDUwMSI6IjEiLCIyMDEzMDYwOCI6IjIiLCIyMDEzMDYwOSI6IjIiLCIyMDEzMDYxMCI6IjEiLCIyMDEzMDYxMSI6IjEiLCIyMDEzMDYxMiI6IjEiLCIyMDEzMDkxOSI6IjEiLCIyMDEzMDkyMCI6IjEiLCIyMDEzMDkyMSI6IjEiLCIyMDEzMDkyMiI6IjIiLCIyMDEzMDkyOCI6IjEiLCIyMDEzMDkyOSI6IjIiLCIyMDEzMDkzMCI6IjIiLCIyMDEzMTAwMSI6IjEiLCIyMDEzMTAwMiI6IjEiLCIyMDEzMTAwMyI6IjEiLCIyMDEzMTAwNCI6IjEiLCIyMDEzMTAwNSI6IjEiLCIyMDEzMTAwNiI6IjEiLCIyMDEzMTAwNyI6IjEiLCIyMDEzMTAxMiI6IjIiLCIyMDE0MDEwMSI6IjEiLCIyMDE0MDEyNiI6IjIiLCIyMDE0MDEzMSI6IjEiLCIyMDE0MDIwMSI6IjEiLCIyMDE0MDIwMiI6IjEiLCIyMDE0MDIwMyI6IjEiLCIyMDE0MDIwNCI6IjEiLCIyMDE0MDIwNSI6IjEiLCIyMDE0MDIwNiI6IjEiLCIyMDE0MDIwOCI6IjIiLCIyMDE0MDQwNSI6IjEiLCIyMDE0MDQwNiI6IjEiLCIyMDE0MDQwNyI6IjEiLCIyMDE0MDUwMSI6IjEiLCIyMDE0MDUwMiI6IjEiLCIyMDE0MDUwMyI6IjEiLCIyMDE0MDUwNCI6IjIiLCIyMDE0MDUzMSI6IjEiLCIyMDE0MDYwMSI6IjEiLCIyMDE0MDYwMiI6IjEiLCIyMDE0MDkwNiI6IjEiLCIyMDE0MDkwNyI6IjEiLCIyMDE0MDkwOCI6IjEiLCIyMDE0MDkyOCI6IjIiLCIyMDE0MTAwMSI6IjEiLCIyMDE0MTAwMiI6IjEiLCIyMDE0MTAwMyI6IjEiLCIyMDE0MTAwNCI6IjEiLCIyMDE0MTAwNSI6IjEiLCIyMDE0MTAwNiI6IjEiLCIyMDE0MTAwNyI6IjEiLCIyMDE0MTAxMSI6IjIiLCIyMDE1MDEwMSI6IjEiLCIyMDE1MDEwMiI6IjEiLCIyMDE1MDEwMyI6IjEiLCIyMDE1MDEwNCI6IjIiLCIyMDE1MDIxNSI6IjIiLCIyMDE1MDIxNiI6IjIiLCIyMDE1MDIxNyI6IjIiLCIyMDE1MDIxOCI6IjEiLCIyMDE1MDIxOSI6IjEiLCIyMDE1MDIyMCI6IjEiLCIyMDE1MDIyMSI6IjEiLCIyMDE1MDIyMiI6IjEiLCIyMDE1MDIyMyI6IjEiLCIyMDE1MDIyNCI6IjEiLCIyMDE1MDIyNSI6IjIiLCIyMDE1MDIyNiI6IjIiLCIyMDE1MDIyNyI6IjIiLCIyMDE1MDIyOCI6IjIiLCIyMDE1MDQwNCI6IjEiLCIyMDE1MDQwNSI6IjEiLCIyMDE1MDQwNiI6IjEiLCIyMDE1MDUwMSI6IjEiLCIyMDE1MDUwMiI6IjEiLCIyMDE1MDUwMyI6IjEiLCIyMDE1MDYyMCI6IjEiLCIyMDE1MDYyMSI6IjEiLCIyMDE1MDYyMiI6IjEiLCIyMDE1MDkwMyI6IjEiLCIyMDE1MDkwNCI6IjEiLCIyMDE1MDkwNSI6IjEiLCIyMDE1MDkwNiI6IjIiLCIyMDE1MDkyNiI6IjEiLCIyMDE1MDkyNyI6IjEiLCIyMDE1MDkyOCI6IjIiLCIyMDE1MDkyOSI6IjIiLCIyMDE1MDkzMCI6IjIiLCIyMDE1MTAwMSI6IjEiLCIyMDE1MTAwMiI6IjEiLCIyMDE1MTAwMyI6IjEiLCIyMDE1MTAwNCI6IjEiLCIyMDE1MTAwNSI6IjEiLCIyMDE1MTAwNiI6IjEiLCIyMDE1MTAwNyI6IjEiLCIyMDE1MTAwOCI6IjIiLCIyMDE1MTAwOSI6IjIiLCIyMDE1MTAxMCI6IjIiLCIyMDE2MDEwMSI6IjEiLCIyMDE2MDEwMiI6IjEiLCIyMDE2MDEwMyI6IjEiLCIyMDE2MDIwNiI6IjIiLCIyMDE2MDIwNyI6IjEiLCIyMDE2MDIwOCI6IjEiLCIyMDE2MDIwOSI6IjEiLCIyMDE2MDIxMCI6IjEiLCIyMDE2MDIxMSI6IjEiLCIyMDE2MDIxMiI6IjEiLCIyMDE2MDIxMyI6IjEiLCIyMDE2MDIxNCI6IjIiLCIyMDE2MDQwMiI6IjEiLCIyMDE2MDQwMyI6IjEiLCIyMDE2MDQwNCI6IjEiLCIyMDE2MDQzMCI6IjEiLCIyMDE2MDUwMSI6IjEiLCIyMDE2MDUwMiI6IjEiLCIyMDE2MDYwOSI6IjEiLCIyMDE2MDYxMCI6IjEiLCIyMDE2MDYxMSI6IjEiLCIyMDE2MDYxMiI6IjIiLCIyMDE2MDkxNSI6IjEiLCIyMDE2MDkxNiI6IjEiLCIyMDE2MDkxNyI6IjEiLCIyMDE2MDkxOCI6IjIiLCIyMDE2MTAwMSI6IjEiLCIyMDE2MTAwMiI6IjEiLCIyMDE2MTAwMyI6IjEiLCIyMDE2MTAwNCI6IjEiLCIyMDE2MTAwNSI6IjEiLCIyMDE2MTAwNiI6IjEiLCIyMDE2MTAwNyI6IjEiLCIyMDE2MTAwOCI6IjIiLCIyMDE2MTAwOSI6IjIiLCIyMDE2MTIzMSI6IjEiLCIyMDE3MDEwMSI6IjEiLCIyMDE3MDEwMiI6IjEiLCIyMDE3MDEyMiI6IjIiLCIyMDE3MDEyNyI6IjEiLCIyMDE3MDEyOCI6IjEiLCIyMDE3MDEyOSI6IjEiLCIyMDE3MDEzMCI6IjEiLCIyMDE3MDEzMSI6IjEiLCIyMDE3MDIwMSI6IjEiLCIyMDE3MDIwMiI6IjEiLCIyMDE3MDIwMyI6IjIiLCIyMDE3MDIwNCI6IjIiLCIyMDE3MDQwMSI6IjIiLCIyMDE3MDQwMiI6IjEiLCIyMDE3MDQwMyI6IjEiLCIyMDE3MDQwNCI6IjEiLCIyMDE3MDQyOSI6IjEiLCIyMDE3MDQzMCI6IjEiLCIyMDE3MDUwMSI6IjEiLCIyMDE3MDUyNyI6IjIiLCIyMDE3MDUyOCI6IjEiLCIyMDE3MDUyOSI6IjEiLCIyMDE3MDUzMCI6IjEiLCIyMDE3MDkzMCI6IjIiLCIyMDE3MTAwMSI6IjEiLCIyMDE3MTAwMiI6IjEiLCIyMDE3MTAwMyI6IjEiLCIyMDE3MTAwNCI6IjEiLCIyMDE3MTAwNSI6IjEiLCIyMDE3MTAwNiI6IjEiLCIyMDE3MTAwNyI6IjEiLCIyMDE3MTAwOCI6IjEiLCIyMDE3MTIzMCI6IjEiLCIyMDE3MTIzMSI6IjEiLCIyMDE4MDEwMSI6IjEiLCIyMDE4MDIxMSI6IjIiLCIyMDE4MDIxNSI6IjEiLCIyMDE4MDIxNiI6IjEiLCIyMDE4MDIxNyI6IjEiLCIyMDE4MDIxOCI6IjEiLCIyMDE4MDIxOSI6IjEiLCIyMDE4MDIyMCI6IjEiLCIyMDE4MDIyMSI6IjEiLCIyMDE4MDIyNCI6IjIiLCIyMDE4MDQwNSI6IjEiLCIyMDE4MDQwNiI6IjEiLCIyMDE4MDQwNyI6IjEiLCIyMDE4MDQwOCI6IjIiLCIyMDE4MDQyOCI6IjIiLCIyMDE4MDQyOSI6IjEiLCIyMDE4MDQzMCI6IjEiLCIyMDE4MDUwMSI6IjEiLCIyMDE4MDYxNiI6IjEiLCIyMDE4MDYxNyI6IjEiLCIyMDE4MDYxOCI6IjEiLCIyMDE4MDkyMiI6IjEiLCIyMDE4MDkyMyI6IjEiLCIyMDE4MDkyNCI6IjEiLCIyMDE4MDkyOSI6IjIiLCIyMDE4MDkzMCI6IjIiLCIyMDE4MTAwMSI6IjEiLCIyMDE4MTAwMiI6IjEiLCIyMDE4MTAwMyI6IjEiLCIyMDE4MTAwNCI6IjEiLCIyMDE4MTAwNSI6IjEiLCIyMDE4MTAwNiI6IjEiLCIyMDE4MTAwNyI6IjEiLCIyMDE4MTIyOSI6IjIiLCIyMDE4MTIzMCI6IjEiLCIyMDE4MTIzMSI6IjEiLCIyMDE5MDEwMSI6IjEiLCIyMDE5MDIwMiI6IjIiLCIyMDE5MDIwMyI6IjIiLCIyMDE5MDIwNCI6IjEiLCIyMDE5MDIwNSI6IjEiLCIyMDE5MDIwNiI6IjEiLCIyMDE5MDIwNyI6IjEiLCIyMDE5MDIwOCI6IjEiLCIyMDE5MDIwOSI6IjEiLCIyMDE5MDIxMCI6IjEiLCIyMDE5MDQwNSI6IjEiLCIyMDE5MDQwNiI6IjEiLCIyMDE5MDQwNyI6IjEiLCIyMDE5MDQyOCI6IjIiLCIyMDE5MDUwMSI6IjEiLCIyMDE5MDUwMiI6IjEiLCIyMDE5MDUwMyI6IjEiLCIyMDE5MDUwNCI6IjEiLCIyMDE5MDUwNSI6IjIiLCIyMDE5MDYwNyI6IjEiLCIyMDE5MDYwOCI6IjEiLCIyMDE5MDYwOSI6IjEiLCIyMDE5MDkxMyI6IjEiLCIyMDE5MDkxNCI6IjEiLCIyMDE5MDkxNSI6IjEiLCIyMDE5MDkyOSI6IjIiLCIyMDE5MDkzMCI6IjIiLCIyMDE5MTAwMSI6IjEiLCIyMDE5MTAwMiI6IjEiLCIyMDE5MTAwMyI6IjEiLCIyMDE5MTAwNCI6IjEiLCIyMDE5MTAwNSI6IjEiLCIyMDE5MTAwNiI6IjEiLCIyMDE5MTAwNyI6IjEiLCIyMDE5MTAxMiI6IjIifQ==';
festivalMsg = 'eyJTIjp7IjEwMDEiOlt7IlYiOiLlm73luoboioIiLCJQIjoiMTAiLCJZIjoiMTk0OSJ9LHsiViI6IuS4lueVjOmfs+S5kOaXpSIsIlAiOiIyIiwiWSI6IjE5ODAifSx7IlYiOiLlm73pmYXogIHkurroioIiLCJQIjoiMiIsIlkiOiIxOTkyIn1dLCIxMDAyIjpbeyJWIjoi5Zu96ZmF5ZKM5bmz5LiO5rCR5Li76Ieq55Sx5paX5LqJ5pelIiwiUCI6IjIiLCJZIjoiMTk0OSJ9XSwiMTAwNCI6W3siViI6IuS4lueVjOWKqOeJqeaXpSIsIlAiOiIyIiwiWSI6IjE5MzEifV0sIjEwMDUiOlt7IlYiOiLlm73pmYXmlZnluIjoioIiLCJQIjoiMiIsIlkiOiIxOTk0In1dLCIxMDA4IjpbeyJWIjoi5YWo5Zu96auY6KGA5Y6L5pelIiwiUCI6IjIiLCJZIjoiMTk5OCJ9XSwiMTAwOSI6W3siViI6IuS4lueVjOmCruaUv+aXpSIsIlAiOiIyIiwiWSI6IjE5NjkifV0sIjEwMTAiOlt7IlYiOiLovpvkuqXpnanlkb0iLCJQIjoiNiIsIlkiOiIxOTExIn0seyJWIjoi5LiW55WM57K+56We5Y2r55Sf5pelIiwiUCI6IjIiLCJZIjoiMTk5MiJ9XSwiMTAxMSI6W3siViI6IuS4lueVjOmVh+eXm+aXpSIsIlAiOiIyIiwiWSI6IjE5NDkifV0sIjEwMTMiOlt7IlYiOiLkuJbnlYzkv53lgaXml6UiLCJQIjoiMiIsIlkiOiIxOTUwIn1dLCIxMDE0IjpbeyJWIjoi5LiW55WM5qCH5YeG5pelIiwiUCI6IjIiLCJZIjoiMTk0NiJ9XSwiMTAxNSI6W3siViI6IuWbvemZheebsuS6uuiKgijnmb3miYvmnZboioIpIiwiUCI6IjIiLCJZIjoiMTk4NCIsIksiOiLlm73pmYXnm7LkurroioIifV0sIjEwMTYiOlt7IlYiOiLkuJbnlYznsq7po5/ml6UiLCJQIjoiMiIsIlkiOiIxOTgxIn1dLCIxMDE3IjpbeyJWIjoi5LiW55WM5raI6Zmk6LSr5Zuw5pelIiwiUCI6IjIiLCJZIjoiMTk5MiJ9XSwiMTAyMiI6W3siViI6IuS4lueVjOS8oOe7n+WMu+iNr+aXpSIsIlAiOiIyIiwiWSI6IjE5OTEifV0sIjEwMjQiOlt7IlYiOiLogZTlkIjlm73ml6UiLCJQIjoiMiIsIlkiOiIxOTQyIn0seyJWIjoi5LiW55WM5Y+R5bGV5a6j5Lyg5pelIiwiUCI6IjIiLCJZIjoiMTk0MiJ9XSwiMTAyOCI6W3siViI6IuS4lueVjOeUt+aAp+WBpeW6t+aXpSIsIlAiOiIyIiwiWSI6IjE5NDkifV0sIjEwMzEiOlt7IlYiOiLkuIflnKPlpJwiLCJQIjoiOSIsIlkiOiIxOTAwIn0seyJWIjoi5LiW55WM5Yuk5L+t5pelIiwiUCI6IjIiLCJZIjoiMTkyNCJ9XSwiMTEwNyI6W3siViI6IuWNgeaciOekvuS8muS4u+S5iemdqeWRvee6quW/teaXpSIsIlAiOiIyIiwiWSI6IjE5MTcifV0sIjExMDgiOlt7IlYiOiLkuK3lm73orrDogIXml6UiLCJQIjoiMiIsIlkiOiIyMDAwIn1dLCIxMTA5IjpbeyJWIjoi5YWo5Zu95raI6Ziy5a6J5YWo5a6j5Lyg5pWZ6IKy5pelIiwiUCI6IjIiLCJZIjoiMTk5MiJ9XSwiMTExMCI6W3siViI6IuS4lueVjOmdkuW5tOiKgiIsIlAiOiIyIiwiWSI6IjE5ODQifV0sIjExMTEiOlt7IlYiOiLlm73pmYXnp5HlrabkuI7lkozlubPlkagiLCJQIjoiMiIsIlkiOiIxOTg4In0seyJWIjoi5YWJ5qON6IqCIiwiUCI6IjYiLCJZIjoiMjAxNSJ9XSwiMTExMiI6W3siViI6IuWtmeS4reWxseivnui+sOe6quW/teaXpSIsIlAiOiIyIiwiWSI6IjE4NjYifV0sIjExMTQiOlt7IlYiOiLkuJbnlYzns5blsL/nl4Xml6UiLCJQIjoiMiIsIlkiOiIxOTkxIn1dLCIxMTE2IjpbeyJWIjoi5Zu96ZmF5a695a655pelIiwiUCI6IjIiLCJZIjoiMTk0OSJ9XSwiMTExNyI6W3siViI6IuWbvemZheWkp+WtpueUn+iKgiIsIlAiOiIyIiwiWSI6IjE5NDYifV0sIjExMjEiOlt7IlYiOiLkuJbnlYzpl67lgJnml6UiLCJQIjoiMiIsIlkiOiIxOTczIn0seyJWIjoi5LiW55WM55S16KeG5pelIiwiUCI6IjIiLCJZIjoiMTk5NiJ9XSwiMTEyNSI6W3siViI6Iua2iOmZpOWvueWmh+Wls+eahOaatOWKm+aXpSIsIlAiOiIyIiwiWSI6IjE5NDkifV0sIjExMjkiOlt7IlYiOiLlm73pmYXlo7Dmj7Tlt7Tli5Lmlq/lnabkurrmsJHlm73pmYXml6UiLCJQIjoiMiIsIlkiOiIxOTc3In1dLCIxMjAxIjpbeyJWIjoi6Im+5ruL55eF5pelIiwiUCI6IjYiLCJZIjoiMTk4OCJ9XSwiMTIwMiI6W3siViI6IuWFqOWbveS6pOmAmuWuieWFqOaXpSIsIlAiOiIyIiwiWSI6IjIwMTIifV0sIjEyMDMiOlt7IlYiOiLkuJbnlYzmrovnlr7kurrml6UiLCJQIjoiMiIsIlkiOiIxOTkyIn1dLCIxMjA0IjpbeyJWIjoi5YWo5Zu95rOV5Yi25a6j5Lyg5pelIiwiUCI6IjIiLCJZIjoiMjAwMSJ9XSwiMTIwNSI6W3siViI6IuS4lueVjOW8seiDveS6uuWjq+aXpSIsIlAiOiIyIiwiWSI6IjE5NDkifSx7IlYiOiLlm73pmYXnu4/mtY7lkoznpL7kvJrlj5HlsZXlv5fmhL/kurrlkZjml6UiLCJQIjoiMiIsIlkiOiIxOTg1In1dLCIxMjA3IjpbeyJWIjoi5Zu96ZmF5rCR6Iiq5pelIiwiUCI6IjIiLCJZIjoiMTk0OSJ9XSwiMTIwOSI6W3siViI6IuWbvemZheWPjeiFkOi0peaXpSIsIlAiOiIyIiwiWSI6IjE5NDkifV0sIjEyMTAiOlt7IlYiOiLkuJbnlYzkurrmnYPml6UiLCJQIjoiMiIsIlkiOiIxOTQ4In1dLCIxMjExIjpbeyJWIjoi5LiW55WM6Ziy5rK75ZOu5ZaY5pelIiwiUCI6IjIiLCJZIjoiMTk0OSJ9LHsiViI6IuWbvemZheWxseWys+aXpSIsIlAiOiIyIiwiWSI6IjIwMDMifV0sIjEyMTIiOlt7IlYiOiLopb/lronkuovlj5jnuqrlv7Xml6UiLCJQIjoiMiIsIlkiOiIxOTM2In1dLCIxMjEzIjpbeyJWIjoi5Y2X5Lqs5aSn5bGg5p2A5q276Zq+6ICF5Zu95a625YWs56Wt5pelIiwiUCI6IjkiLCJZIjoiMTkzNyIsIkwiOiLlhaznpa3ml6UifV0sIjEyMTUiOlt7IlYiOiLkuJbnlYzlvLrljJblhY3nlqvml6UiLCJQIjoiMiIsIlkiOiIxOTQ5In1dLCIxMjE4IjpbeyJWIjoi5Zu96ZmF56e75b6Z6ICF5pelIiwiUCI6IjIiLCJZIjoiMjAwMCJ9XSwiMTIyMCI6W3siViI6Iua+s+mXqOWbnuW9kiIsIlAiOiI2IiwiWSI6IjE5OTkifV0sIjEyMjEiOlt7IlYiOiLlm73pmYXnr67nkIPml6UiLCJQIjoiMiIsIlkiOiIxODkxIn1dLCIxMjI0IjpbeyJWIjoi5bmz5a6J5aScIiwiUCI6IjkiLCJZIjoiMTgxOCJ9XSwiMTIyNSI6W3siViI6IuWco+ivnuiKgiIsIlAiOiI5IiwiWSI6IjE2MDcifV0sIjEyMjYiOlt7IlYiOiLkuJbnlYzotrPnkIPml6UiLCJQIjoiMiIsIlkiOiIxODYzIn1dLCIwMjEzIjpbeyJWIjoi5LiW55WM5peg57q/55S15pelIiwiUCI6IjIiLCJZIjoiMjAxMyJ9XSwiMDIyMSI6W3siViI6IuWbvemZheavjeivreaXpSIsIlAiOiIyIiwiWSI6IjE5OTkifV0sIjAzMDYiOlt7IlYiOiLkuJbnlYzpnZLlhYnnnLzml6UiLCJQIjoiMiIsIlkiOiIyMDA4In1dLCIwMzE4IjpbeyJWIjoi5YWo5Zu954ix6IKd5pelIiwiUCI6IjIiLCJZIjoiMjAwMSJ9XSwiMDQwOCI6W3siViI6IuWbvemZheePjeeogOWKqOeJqeS/neaKpOaXpSIsIlAiOiIyIiwiWSI6IjIwMDAifV0sIjA0MTEiOlt7IlYiOiLkuJbnlYzluJXph5Hmo67nl4Xml6UiLCJQIjoiMiIsIlkiOiIxOTk3In1dLCIwNDEyIjpbeyJWIjoi5LiW55WM6Iiq5aSp5pelIiwiUCI6IjIiLCJZIjoiMjAxMSJ9XSwiMDQxNiI6W3siViI6IuS4lueVjOWXk+mfs+aXpSIsIlAiOiIyIiwiWSI6IjIwMDMifV0sIjA0MTciOlt7IlYiOiLkuJbnlYzooYDlj4vnl4Xml6UiLCJQIjoiMiIsIlkiOiIxOTg5In1dLCIwNDI1IjpbeyJWIjoi5YWo5Zu95YS/56ul6aKE6Ziy5o6l56eN5a6j5Lyg5pelIiwiUCI6IjIiLCJZIjoiMTk4NiJ9XSwiMDQyOSI6W3siViI6IuS4lueVjOiInui5iOaXpSIsIlAiOiIyIiwiWSI6IjE5ODIifV0sIjA0MzAiOlt7IlYiOiLlm73pmYXkuI3miZPlsI/lranml6UiLCJQIjoiMiIsIlkiOiIxOTk4In1dLCIwNTI1IjpbeyJWIjoi5LiW55WM6aKE6Ziy5Lit6aOO5pelIiwiUCI6IjIiLCJZIjoiMjAwNCJ9XSwiMDUyOCI6W3siViI6IuWFqOWbveeIseWPkeaXpSIsIlAiOiIyIiwiWSI6IjIwMTAifV0sIjA2MDgiOlt7IlYiOiLkuJbnlYzmtbfmtIvml6UiLCJQIjoiMiIsIlkiOiIyMDA5In1dLCIwNjExIjpbeyJWIjoi5Lit5Zu95Lq65Y+j5pelIiwiUCI6IjIiLCJZIjoiMjAwMCJ9XSwiMDYxMiI6W3siViI6IuS4lueVjOaXoOerpeW3peaXpSIsIlAiOiIyIiwiWSI6IjIwMDIifV0sIjA2MTQiOlt7IlYiOiLkuJbnlYznjK7ooYDogIXml6UiLCJQIjoiMiIsIlkiOiIyMDA0In1dLCIwNzA2IjpbeyJWIjoi5Zu96ZmF5o6l5ZC75pelIiwiUCI6IjIiLCJZIjoiMTk5MSJ9XSwiMDcxNiI6W3siViI6IuWbvemZheWGsOWjtuaXpSIsIlAiOiIyIiwiWSI6IjIwMDAifV0sIjA3MjgiOlt7IlYiOiLkuJbnlYzogp3ngo7ml6UiLCJQIjoiMiIsIlkiOiIyMDExIn1dLCIwNzI5IjpbeyJWIjoi5LiW55WM54ix6JmO5pelIiwiUCI6IjIiLCJZIjoiMjAxMCJ9XSwiMDgxMyI6W3siViI6IuWbvemZheW3puaSh+WtkOaXpSIsIlAiOiIyIiwiWSI6IjE5NzYifV0sIjA5MjkiOlt7IlYiOiLkuJbnlYzmraXooYzml6UiLCJQIjoiMiIsIlkiOiIxOTkyIn1dLCIwODE5IjpbeyJWIjoi5Lit5Zu95Yy75biI6IqCIiwiUCI6IjIiLCJZIjoiMjAxNyJ9XSwiMDkwMSI6W3siViI6IuWFqOWbveS4reWwj+WtpuW8gOWtpuaXpSIsIlAiOiIyIiwiWSI6IjE5NDkifV0sIjA2MjIiOlt7IlYiOiLkuK3lm73lhL/nq6XmhYjlloTmtLvliqjml6UiLCJQIjoiMiIsIlkiOiIxOTQ5In1dLCIwNTAzIjpbeyJWIjoi5LiW55WM5paw6Ze76Ieq55Sx5pelIiwiUCI6IjIiLCJZIjoiMTk0OSJ9XSwiMDQyNiI6W3siViI6IuS4lueVjOefpeivhuS6p+adg+aXpSIsIlAiOiIyIiwiWSI6IjE5NDkifV0sIjA0MDIiOlt7IlYiOiLlm73pmYXlhL/nq6Xlm77kuabml6UiLCJQIjoiMiIsIlkiOiIxOTQ5In1dLCIwMjI0IjpbeyJWIjoi56ys5LiJ5LiW55WM6Z2S5bm05pelIiwiUCI6IjIiLCJZIjoiMTk0OSJ9XSwiMDkzMCI6W3siViI6IueDiOWjq+e6quW/teaXpSIsIlAiOiIyIiwiWSI6IjIwMTQifV0sIjA5MjEiOlt7IlYiOiLlm73pmYXlkozlubPml6UiLCJQIjoiMiIsIlkiOiIyMDAyIn0seyJWIjoi5LiW55WM6ICB5bm05oCn55e05ZGG5a6j5Lyg5pelIiwiUCI6IjIiLCJZIjoiMjAwMiJ9XSwiMDgxNSI6W3siViI6IuaXpeacrOaXoOadoeS7tuaKlemZjeaXpSIsIlAiOiI2IiwiWSI6IjE5NDUiLCJMIjoi5pel5pys5oqV6ZmNIn1dLCIwNTE5IjpbeyJWIjoi5Lit5Zu95peF5ri45pelIiwiUCI6IjIiLCJZIjoiMjAxMSJ9XSwiMDkyNyI6W3siViI6IuS4lueVjOaXhea4uOaXpSIsIlAiOiIyIiwiWSI6IjE5NzkifV0sIjA4MDEiOlt7IlYiOiLlu7rlhpvoioIiLCJQIjoiNiIsIlkiOiIxOTQ5In1dLCIwMzMwIjpbeyJWIjoi5be05YuS5pav5Z2m5Zu95Zyf5pelIiwiUCI6IjIiLCJZIjoiMTk3NiJ9XSwiMDQyMiI6W3siViI6IuS4lueVjOWcsOeQg+aXpSIsIlAiOiI2IiwiWSI6IjE5NzAiLCJMIjoi5Zyw55CD5pelIn0seyJWIjoi5LiW55WM5rOV5b6L5pelIiwiUCI6IjIiLCJZIjoiMTk3MCJ9XSwiMDYxNyI6W3siViI6IumYsuayu+iNkua8oOWMluWSjOW5suaXseaXpSIsIlAiOiIyIiwiWSI6IjE5OTUifV0sIjA5MTYiOlt7IlYiOiLlm73pmYXoh63msKflsYLkv53miqTml6UiLCJQIjoiMiIsIlkiOiIxOTk1In0seyJWIjoi5Lit5Zu96ISR5YGl5bq35pelIiwiUCI6IjIiLCJZIjoiMjAwMCJ9XSwiMDYwNiI6W3siViI6IuWFqOWbveeIseecvOaXpSIsIlAiOiIyIiwiWSI6IjE5OTYifV0sIjAxMDEiOlt7IlYiOiLlhYPml6boioIiLCJQIjoiMTAiLCJZIjoiMTk0OSJ9XSwiMDkyOCI6W3siViI6IuWtlOWtkOivnui+sCIsIlAiOiI2IiwiWSI6IjE4OTkifSx7IlYiOiLkuJbnlYzni4Lniqznl4Xml6UiLCJQIjoiMiIsIlkiOiIyMDA3In1dLCIwMzA4IjpbeyJWIjoi5aaH5aWz6IqCIiwiUCI6IjkiLCJZIjoiMTkwOSJ9XSwiMDQyMyI6W3siViI6IuS4lueVjOWbvuS5puWSjOeJiOadg+aXpSIsIlAiOiIyIiwiWSI6IjE5OTUifV0sIjA1MTUiOlt7IlYiOiLnopjnvLrkuY/nl4XpmLLmsrvml6UiLCJQIjoiMiIsIlkiOiIxOTkzIn0seyJWIjoi5Zu96ZmF5a625bqt5pelIiwiUCI6IjIiLCJZIjoiMTk5NCJ9XSwiMDUwNCI6W3siViI6IumdkuW5tOiKgiIsIlAiOiI5IiwiWSI6IjE5MTkifV0sIjA3MTEiOlt7IlYiOiLoiKrmtbfml6UiLCJQIjoiMiIsIlkiOiIyMDA1In0seyJWIjoi5LiW55WM5Lq65Y+j5pelIiwiUCI6IjIiLCJZIjoiMTk4NyJ9XSwiMDQwMSI6W3siViI6IuaEmuS6uuiKgiIsIlAiOiI5IiwiWSI6IjE5ODMifSx7IlYiOiLlhajlm73niLHlm73ljavnlJ/ov5DliqjmnIgo5Zub5pyIKSIsIlAiOiIyIiwiWSI6IjE5NTgiLCJLIjoi5YWo5Zu954ix5Zu95Y2r55Sf6L+Q5Yqo5pyIIn0seyJWIjoi56iO5pS25a6j5Lyg5pyIKOWbm+aciCkiLCJQIjoiMiIsIlkiOiIxOTkyIiwiSyI6IueojuaUtuWuo+S8oOaciCJ9XSwiMDQyNCI6W3siViI6IuS6mumdnuaWsOmXu+W3peS9nOiAheaXpSIsIlAiOiIyIiwiWSI6IjE5NjMifSx7IlYiOiLkuK3lm73oiKrlpKnml6UiLCJQIjoiMiIsIlkiOiIyMDE2In1dLCIwOTE4IjpbeyJWIjoi5Lmd5LiA5YWr5LqL5Y+Y57qq5b+15pelIiwiUCI6IjYiLCJZIjoiMTkzMSIsIksiOiLkuZ3kuIDlhavkuovlj5giLCJMIjoi5Lmd5LiA5YWrIn1dLCIwMzIxIjpbeyJWIjoi5LiW55WM5qOu5p6X5pelIiwiUCI6IjIiLCJZIjoiMTk3MSJ9LHsiViI6Iua2iOmZpOenjeaXj+atp+inhuWbvemZheaXpSIsIlAiOiIyIiwiWSI6IjE5NjYifSx7IlYiOiLkuJbnlYzlhL/mrYzml6UiLCJQIjoiMiIsIlkiOiIxOTc2In1dLCIwOTAzIjpbeyJWIjoi5oqX5pel5oiY5LqJ6IOc5Yip57qq5b+15pelIiwiUCI6IjYiLCJZIjoiMTk0NSIsIkwiOiLmipfmiJjog5zliKkifV0sIjA1MTciOlt7IlYiOiLlm73pmYXnlLXkv6Hml6UiLCJQIjoiMiIsIlkiOiIxOTY5In1dLCIwNzAxIjpbeyJWIjoi6aaZ5riv5Zue5b2SIiwiUCI6IjYiLCJZIjoiMTk5NyJ9LHsiViI6IuW7uuWFmuaXpSIsIlAiOiI5IiwiWSI6IjE5MjEiLCJMIjoi5bu65YWa5pelIn1dLCIwMzIyIjpbeyJWIjoi5LiW55WM5rC05pelIiwiUCI6IjIiLCJZIjoiMTk5MyJ9XSwiMDkwOCI6W3siViI6IuWbvemZheaJq+ebsuaXpSIsIlAiOiIyIiwiWSI6IjE5NjUifSx7IlYiOiLlm73pmYXmlrDpl7vlt6XkvZzogIXml6UiLCJQIjoiMiIsIlkiOiIxOTU4In1dLCIwOTIwIjpbeyJWIjoi5Zu96ZmF54ix54mZ5pelIiwiUCI6IjIiLCJZIjoiMTk4OSJ9XSwiMDUxOCI6W3siViI6IuWNmueJqemmhuaXpSIsIlAiOiI2IiwiWSI6IjE5NzcifV0sIjA3MDIiOlt7IlYiOiLlm73pmYXkvZPogrLorrDogIXml6UiLCJQIjoiMiIsIlkiOiIxOTk1In1dLCIwMzIzIjpbeyJWIjoi5LiW55WM5rCU6LGh5pelIiwiUCI6IjIiLCJZIjoiMTk1MCJ9XSwiMDMxMiI6W3siViI6IuakjeagkeiKgiIsIlAiOiI5IiwiWSI6IjE5NzkifSx7IlYiOiLlrZnkuK3lsbHpgJ3kuJbnuqrlv7Xml6UiLCJQIjoiMiIsIlkiOiIxOTI1In1dLCIwMzAxIjpbeyJWIjoi5Zu96ZmF5rW36LG55pelIiwiUCI6IjIiLCJZIjoiMTk4MyJ9XSwiMDMyNCI6W3siViI6IuS4lueVjOmYsuayu+e7k+aguOeXheaXpSIsIlAiOiIyIiwiWSI6IjE5OTUifV0sIjA5MTAiOlt7IlYiOiLmlZnluIjoioIiLCJQIjoiOSIsIlkiOiIxOTg1In1dLCIwNTA4IjpbeyJWIjoi5LiW55WM57qi5Y2B5a2X5pelIiwiUCI6IjIiLCJZIjoiMTk0OCJ9LHsiViI6IuW+rueskeaXpSIsIlAiOiI2IiwiWSI6IjE5NDgifV0sIjA1MzEiOlt7IlYiOiLkuJbnlYzml6Dng5/ml6UiLCJQIjoiNiIsIlkiOiIxOTg5IiwiTCI6IuaXoOeDn+aXpSJ9XSwiMDYyMyI6W3siViI6IuWlpeael+WMueWFiyIsIlAiOiI2IiwiWSI6IjE5NDgifV0sIjA1MjAiOlt7IlYiOiLlhajlm73lrabnlJ/okKXlhbvml6UiLCJQIjoiMiIsIlkiOiIxOTg5In0seyJWIjoi5YWo5Zu95q+N5Lmz5ZaC5YW75a6j5Lyg5pelIiwiUCI6IjIiLCJZIjoiMTk4OSJ9XSwiMDIxMCI6W3siViI6IuWbvemZheawlOixoeiKgiIsIlAiOiIyIiwiWSI6IjE5OTEifV0sIjA2MDEiOlt7IlYiOiLlhL/nq6XoioIiLCJQIjoiOSIsIlkiOiIxOTQ5In0seyJWIjoi5Zu96ZmF54mb5aW25pelIiwiUCI6IjIiLCJZIjoiMjAwMCJ9XSwiMDgwOCI6W3siViI6IuS4reWbveeUt+WtkOiKgijniLjniLjoioIpIiwiUCI6IjIiLCJZIjoiMTk0NSIsIksiOiLkuK3lm73nlLflrZDoioIifV0sIjAzMDMiOlt7IlYiOiLlhajlm73niLHogLPml6UiLCJQIjoiMiIsIlkiOiIxOTk5In1dLCIwNjI1IjpbeyJWIjoi5YWo5Zu95Zyf5Zyw5pelIiwiUCI6IjIiLCJZIjoiMTk4NiJ9XSwiMDMxNSI6W3siViI6Iua2iOi0ueiAheadg+ebiuaXpSIsIlAiOiI5IiwiWSI6IjE5ODMiLCJMIjoi5raI6LS56ICF5pelIn1dLCIwNDA3IjpbeyJWIjoi5LiW55WM5Y2r55Sf5pelIiwiUCI6IjIiLCJZIjoiMTk0OCJ9XSwiMDYyNiI6W3siViI6IuWbvemZheemgeavkuaXpSIsIlAiOiIyIiwiWSI6IjE5ODcifSx7IlYiOiLlm73pmYXlrqrnq6Dml6UiLCJQIjoiMiIsIlkiOiIxOTg3In1dLCIwMzA1IjpbeyJWIjoi5a2m6Zu36ZSL57qq5b+15pelIiwiUCI6IjIiLCJZIjoiMTk2MyJ9LHsiViI6IuS4reWbvemdkuW5tOW/l+aEv+iAheacjeWKoeaXpSIsIlAiOiIyIiwiWSI6IjE5NDkifV0sIjA3MDciOlt7IlYiOiLkuIPkuIPkuovlj5jnuqrlv7Xml6UiLCJQIjoiNiIsIlkiOiIxOTQ1IiwiSyI6IuS4g+S4g+S6i+WPmCIsIkwiOiLkuIPkuIPkuovlj5gifV0sIjA3MzAiOlt7IlYiOiLpnZ7mtLLlpoflpbPml6UiLCJQIjoiMiIsIlkiOiIxOTk3In1dLCIwNTEyIjpbeyJWIjoi5Zu96ZmF5oqk5aOr6IqCIiwiUCI6IjYiLCJZIjoiMTkxMiIsIkwiOiLmiqTlo6voioIifV0sIjAyMDIiOlt7IlYiOiLkuJbnlYzmub/lnLDml6UiLCJQIjoiNiIsIlkiOiIxOTk3IiwiTCI6Iua5v+WcsOaXpSJ9XSwiMDMxNyI6W3siViI6IuS4reWbveWbveWMu+iKgiIsIlAiOiIyIiwiWSI6IjE5MjkifV0sIjA1MDEiOlt7IlYiOiLlirPliqjoioIiLCJQIjoiMTAiLCJZIjoiMTk0OSJ9XSwiMDIxNCI6W3siViI6IuaDheS6uuiKgiIsIlAiOiI5IiwiWSI6IjE4OTkifV0sIjA2MDUiOlt7IlYiOiLkuJbnlYznjq/looPkv53miqTml6UiLCJQIjoiNiIsIlkiOiIxOTcyIiwiTCI6IueOr+S/neaXpSJ9XX0sIkwiOnsiMTAwMSI6W3siViI6IuWvkuiho+iKgiIsIlAiOiIyIiwiWSI6IjE4OTkifV0sIjEyMDgiOlt7IlYiOiLohYrlhavoioIiLCJQIjoiOSIsIlkiOiIxODk5In1dLCIxMjE2IjpbeyJWIjoi5bC+54mZIiwiUCI6IjYiLCJZIjoiMTg5OSJ9XSwiMTIyMyI6W3siViI6IuWMl+aWueWwj+W5tCIsIlAiOiI5IiwiWSI6IjE4OTkiLCJLIjoi5bCP5bm0In1dLCIxMjI0IjpbeyJWIjoi5Y2X5pa55bCP5bm0IiwiUCI6IjkiLCJZIjoiMTg5OSIsIksiOiLlsI/lubQifV0sIjEyMzAiOlt7IlYiOiLpmaTlpJXlpJwiLCJQIjoiOSIsIlkiOiIxODk5In1dLCIwNDA4IjpbeyJWIjoi5L2b6K+e5pelIiwiUCI6IjIiLCJZIjoiMTkwMCJ9XSwiMDMwMyI6W3siViI6IuS4iuW3s+iKgiIsIlAiOiI2IiwiWSI6IjE5MDAifV0sIjAyMDIiOlt7IlYiOiLpvpnmiqzlpLQiLCJQIjoiOSIsIlkiOiIxODk5In1dLCIwNzA3IjpbeyJWIjoi5LiD5aSV6IqCIiwiUCI6IjkiLCJZIjoiMTg5OSJ9XSwiMDUwNSI6W3siViI6Iuerr+WNiOiKgiIsIlAiOiIxMCIsIlkiOiIxODk5In1dLCIwODE1IjpbeyJWIjoi5Lit56eL6IqCIiwiUCI6IjEwIiwiWSI6IjE4OTkifV0sIjA5MDkiOlt7IlYiOiLph43pmLPoioIiLCJQIjoiOSIsIlkiOiIxODk5In1dLCIwNjI0IjpbeyJWIjoi54Gr5oqK6IqCIiwiUCI6IjIiLCJZIjoiMTg5OSJ9XSwiMDEwMSI6W3siViI6IuaYpeiKgiIsIlAiOiIxMCIsIlkiOiIxODk5In1dLCIwNzE1IjpbeyJWIjoi5Lit5YWD6IqCIiwiUCI6IjkiLCJZIjoiMTg5OSJ9XSwiMDExNSI6W3siViI6IuWFg+WuteiKgiIsIlAiOiI5IiwiWSI6IjE4OTkifV19LCJXIjp7IjEwMTEiOlt7IlYiOiLlm73pmYXkvY/miL/ml6UiLCJQIjoiMiIsIlkiOiIxOTg1In1dLCIxMDIzIjpbeyJWIjoi5Zu96ZmF5YeP6L276Ieq54S254G+5a6z5pelIiwiUCI6IjIiLCJZIjoiMTk4NyJ9XSwiMTAyNCI6W3siViI6IuS4lueVjOinhuinieaXpSIsIlAiOiIyIiwiWSI6IjIwMDAifV0sIjExNDQiOlt7IlYiOiLmhJ/mganoioIiLCJQIjoiNiIsIlkiOiIxOTQxIn1dLCIxMjIwIjpbeyJWIjoi5Zu96ZmF5YS/56ul55S16KeG5bm/5pKt5pelIiwiUCI6IjIiLCJZIjoiMTk4NSJ9XSwiMDQ0MCI6W3siViI6IuS4lueVjOWEv+erpeaXpSIsIlAiOiIyIiwiWSI6IjE5ODYifV0sIjA5MzYiOlt7IlYiOiLkuJbnlYzmuIXmtIHlnLDnkIPml6UiLCJQIjoiMiIsIlkiOiIyMDA2In1dLCIwNzExIjpbeyJWIjoi5LiW55WM5bu6562R5pelIiwiUCI6IjIiLCJZIjoiMTk4NSJ9XSwiMDM1MSI6W3siViI6IuWFqOWbveS4reWwj+WtpueUn+WuieWFqOaVmeiCsuaXpSIsIlAiOiIyIiwiWSI6IjE5OTYifV0sIjA3MzAiOlt7IlYiOiLooqvlpbTlvbnlm73lrrblkagiLCJQIjoiMiIsIlkiOiIxOTU5In1dLCIwNjMwIjpbeyJWIjoi54i25Lqy6IqCIiwiUCI6IjkiLCJZIjoiMjAwNSJ9XSwiMDUyMCI6W3siViI6IuavjeS6suiKgiIsIlAiOiI5IiwiWSI6IjE4NzYifV0sIjA1MzAiOlt7IlYiOiLlhajlm73liqnmrovml6UiLCJQIjoiMiIsIlkiOiIxOTkwIn1dLCIwMTUwIjpbeyJWIjoi5Zu96ZmF6bq76aOO6IqCIiwiUCI6IjIiLCJZIjoiMTk1MyJ9XSwiMDk0MCI6W3siViI6IuWbvemZheiBi+S6uuiKgiIsIlAiOiIyIiwiWSI6IjE5NTgifV0sIjA5NTAiOlt7IlYiOiLkuJbnlYzlv4PohI/ml6UiLCJQIjoiMiIsIlkiOiIxOTc4In1dfX0='
var vacationFestivalData = {}, vacationData, festivalData;
vacationFestivalData.vacationData = base64decode(vocationMsg);
vacationData = JSON.parse(vacationFestivalData.vacationData);
vacationFestivalData.festivalData = utf8to16(base64decode(festivalMsg));
festivalData = JSON.parse(vacationFestivalData.festivalData);

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

function getWeekIndexString(year, month, day) {
    var weekIndex = Math.ceil(day / 7);
    var week = new Date(year, (month - 1), day).getDay();
    var weekString = (month < 10 ? "0" + month : month.toString()) + weekIndex + week;
    return weekString;
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

/*****************************************************************************
 日期资料
 *****************************************************************************/

var lunarInfo = new Array(
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63);
var hanshu = { "2007": [196, 206, 226, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2008": [201, 211, 221, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2009": [195, 205, 225, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2010": [200, 210, 220, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2011": [195, 205, 225, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2012": [200, 210, 220, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2013": [194, 204, 224, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2014": [199, 209, 219, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2015": [194, 204, 224, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2016": [199, 209, 229, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2017": [193, 203, 223, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2018": [198, 208, 228, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2019": [193, 203, 223, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2020": [198, 208, 228, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2021": [192, 202, 222, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2022": [197, 207, 227, 355, 364, 8, 17, 26, 35, 44, 53, 62], "2023": [192, 202, 222, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2024": [197, 207, 227, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2025": [201, 211, 221, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2026": [196, 206, 226, 355, 364, 8, 17, 26, 35, 44, 53, 62], "2027": [201, 211, 221, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2028": [196, 206, 226, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2029": [200, 210, 220, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2030": [195, 205, 225, 355, 364, 8, 17, 26, 35, 44, 53, 62], "2031": [200, 210, 220, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2032": [195, 205, 225, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2033": [199, 209, 219, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2034": [194, 204, 224, 355, 364, 8, 17, 26, 35, 44, 53, 62], "2035": [199, 209, 219, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2036": [194, 204, 224, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2037": [198, 208, 228, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2038": [193, 203, 223, 355, 364, 8, 17, 26, 35, 44, 53, 62], "2039": [198, 208, 228, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2040": [193, 203, 223, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2041": [197, 207, 227, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2042": [192, 202, 222, 355, 364, 8, 17, 26, 35, 44, 53, 62], "2043": [197, 207, 227, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2044": [202, 212, 222, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2045": [196, 206, 226, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2046": [201, 211, 221, 355, 364, 8, 17, 26, 35, 44, 53, 62], "2047": [196, 206, 226, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2048": [201, 211, 221, 356, 365, 9, 18, 27, 36, 45, 54, 63], "2049": [195, 205, 225, 356, 365, 8, 17, 26, 35, 44, 53, 62], "2050": [200, 210, 220, 355, 364, 8, 17, 26, 35, 44, 53, 62] };
var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");

var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
var nStr2 = new Array('初', '十', '廿', '卅', '□');
var monthName = new Array("正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月");

/*****************************************************************************
 日期计算
 *****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    return (sum + leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    else return (0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {

    ///<summary>
    ///返回农历 y年闰哪个月 1-12 , 没闰返回 0
    ///</summary>

    return (lunarInfo[y - 1900] & 0xf);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y, m) {
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}


//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

    var i, leap = 0, temp = 0;
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2050 && offset > 0; i++) { temp = lYearDays(i); offset -= temp; }

    if (offset < 0) { offset += temp; i--; }

    this.year = i;

    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;

    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && this.isLeap == false) { --i; this.isLeap = true; temp = leapDays(this.year); }
        else { temp = monthDays(this.year, i); }

        //解除闰月
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;

        offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap) { this.isLeap = false; }
        else { this.isLeap = true; --i; }

    if (offset < 0) { offset += temp; --i; }

    this.month = i;
    this.day = offset + 1;
}

//==============================返回公历 y年某m+1月的天数
function solarDays(y, m) {
    if (m == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    else
        return (solarMonth[m]);
}
//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
    return (Gan[num % 10] + Zhi[num % 12]);
}
//============================== 阴历属性
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay, term) {

    this.isToday = false;
    //瓣句
    this.sYear = sYear;   //公元年4位数字
    this.sMonth = sMonth;  //公元月数字
    this.sDay = sDay;    //公元日数字
    this.week = week;    //星期, 1个中文
    //农历
    this.lYear = lYear;   //公元年4位数字
    this.lMonth = lMonth;  //农历月数字
    this.lDay = lDay;    //农历日数字
    this.isLeap = isLeap;  //是否为农历闰月?
    //八字
    this.cYear = cYear;   //年柱, 2个中文
    this.cMonth = cMonth;  //月柱, 2个中文
    this.cDay = cDay;    //日柱, 2个中文

    this.color = '';

    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = term; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate());
}

//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

OBJ.length      返回当月最大日
OBJ.firstWeek   返回当月一日星期

由 OBJ[日期].属性名称 即可取得各项值

OBJ[日期].isToday  返回是否为今日 true 或 false

其他 OBJ[日期] 属性参见 calElement() 中的注解
*/

function calendar(y, m) {
    var Today = new Date();
    var tY = Today.getFullYear();
    var tM = Today.getMonth();
    var tD = Today.getDate();
    var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2, tmp3, lM2, lY2, lD2, xs, fs, cs;
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;
    sDObj = new Date(y, m, 1, 0, 0, 0, 0);    //当月一日日期
    this.length = solarDays(y, m);       //公历当月天数
    this.firstWeek = sDObj.getDay();    //公历当月1日星期几
    ////////年柱 1900年立春后为庚子年(60进制36)
    if (m < 2) cY = cyclical(y - 1900 + 36 - 1);
    else cY = cyclical(y - 1900 + 36);
    var term2 = getTerm(y, 3); //立春日期
    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = getTerm(y, ((m + 1) * 2 - 1)); //返回当月「节」为几日开始
    cM = cyclical((y - 1900) * 12 + m + 12);
    lM2 = (y - 1900) * 12 + m + 12;
    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    for (var i = 0; i < this.length; i++) {
        if (lD > lX) {
            sDObj = new Date(y, m, i + 1);    //当月一日日期
            lDObj = new Lunar(sDObj);     //农历
            lY = lDObj.year;              //农历年
            lM = lDObj.month;             //农历月
            lD = lDObj.day;               //农历日
            lL = lDObj.isLeap;            //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最后一天
            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
        }
        //依节气调整二月分的年柱, 以立春为界
        if (m == 1 && (i + 1) == term2) {
            cY = cyclical(y - 1900 + 36);
            lY2 = (y - 1900 + 36);
        }
        //依节气月柱, 以「节」为界
        if ((i + 1) == firstNode) {
            cM = cyclical((y - 1900) * 12 + m + 13);
            lM2 = (y - 1900) * 12 + m + 13;
        }
        //日柱
        cD = cyclical(dayCyclical + i);
        lD2 = (dayCyclical + i);
        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        firstNode = getTerm(y, ((m + 1) * 2 - 1));//返回当月「节」为几日开始
        var secondNode = getTerm(y, ((m + 1) * 2));//返回当月「节」为几日开始
        //传入的日期的节气与否
        var term = '';
        if (firstNode === i + 1) {
            term = solarTerm[(m + 1) * 2 - 2];
        }
        if (secondNode === i + 1) {
            term = solarTerm[(m + 1) * 2 - 1];
        }
        this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL, cY, cM, cD, term);
        if ((lD2) % 10 == 0 || (lD2) % 10 == 5) { xs = '东北'; }
        else if ((lD2) % 10 == 1 || (lD2) % 10 == 6) { xs = '西北'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 7) { xs = '西南'; }
        else if ((lD2) % 10 == 3 || (lD2) % 10 == 8) { xs = '正南'; }
        else if ((lD2) % 10 == 4 || (lD2) % 10 == 9) { xs = '东南'; }
        if ((lD2) % 10 == 0 || (lD2) % 10 == 1) { fs = '东南'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 3) { fs = '正东'; }
        else if ((lD2) % 10 == 4) { fs = '正北'; }
        else if ((lD2) % 10 == 5) { fs = '正南'; }
        else if ((lD2) % 10 == 6 || (lD2) % 10 == 7) { fs = '西南'; }
        else if ((lD2) % 10 == 8) { fs = '西北'; }
        else if ((lD2) % 10 == 9) { fs = '正西'; }
        if ((lD2) % 10 == 0 || (lD2) % 10 == 1) { cs = '东北'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 3) { cs = '西南'; }
        else if ((lD2) % 10 == 4 || (lD2) % 10 == 5) { cs = '正北'; }
        else if ((lD2) % 10 == 6 || (lD2) % 10 == 7) { cs = '正东'; }
        else if ((lD2) % 10 == 8 || (lD2) % 10 == 9) { cs = '正南'; }
    }
    //节气
    // tmp1 = sTerm(y, m * 2) - 1;
    // tmp2 = sTerm(y, m * 2 + 1) - 1;
    // tmp1 = solarTermChange(y + "-" + (m + 1) + "-" + (tmp1 + 1), tmp1);
    // tmp2 = solarTermChange(y + "-" + (m + 1) + "-" + (tmp2 + 1), tmp2);
    // this[tmp1].solarTerms = solarTerm[m * 2];
    // this[tmp2].solarTerms = solarTerm[m * 2 + 1];
    // if (m == 3) this[tmp1].color = 'red'; //清明颜色
}
/**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property 
      * @return 0x string For splice
      */
var sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
    '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
    'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
    '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
    '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
    '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
    '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
    '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
    '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
    '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'];
/**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
function getTerm(y, n) {
    //TermTable[(y - 1900) * 24 + n];
    if (y < 1900 || y > 2100) {
        return -1;
    }
    if (n < 1 || n > 24) {
        return -1;
    }
    var _table = sTermInfo[y - 1900];
    var _info = [
        parseInt('0x' + _table.substr(0, 5)).toString(),
        parseInt('0x' + _table.substr(5, 5)).toString(),
        parseInt('0x' + _table.substr(10, 5)).toString(),
        parseInt('0x' + _table.substr(15, 5)).toString(),
        parseInt('0x' + _table.substr(20, 5)).toString(),
        parseInt('0x' + _table.substr(25, 5)).toString()
    ];
    var _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),

        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),

        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),

        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),

        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),

        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2),
    ];
    return parseInt(_calday[n - 1]);
}
//====================== 中文日期
function cDay(d) {
    var s;

    switch (d) {
        case 10:
            s = '初十'; break;
        case 20:
            s = '二十'; break;
            break;
        case 30:
            s = '三十'; break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}
//===================返回属相
function getPet(birthyear, lichunOffset) {
    var start = 1900, value = "";
    x = (birthyear - start) % 12;
    // if (x !== 0 && lichunOffset < 0) {
    //     x -= 1;
    // }
    value = Animals[x];
    return value;
}
//节气日期的调整
// ?????
function solarTermChange(detailday, tem) {
    var TermChangeDayArray = {
        "2012-5-21": "20", "2012-12-6": "7", "2013-2-3": "4", "2013-7-23": "22",
        "2013-12-21": "22", "2014-3-5": "6", "2015-1-5": "6", "2017-7-23": "22",
        "2017-12-21": "22", "2018-2-18": "19", "2018-3-20": "21", "2019-2-5": "4",
        "2019-6-22": "21", "2020-7-7": "6", "2020-8-23": "22", "2020-12-6": "7"
    };

    var result;
    try {
        if (typeof TermChangeDayArray[detailday] != 'undefined') {
            result = parseInt(TermChangeDayArray[detailday], 10) - 1;
        }
        else {
            result = tem;
        }
    }
    catch (e) {
        result = tem;
    }
    return result;
}

//base64编码
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
//base64解码
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
//utf-8转utf16
function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
//utf-16转utf-8
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

var BASE_STEMS_DATE = new Date(1899, 1, 4, 0, 0);
var BASE_STEMS_YEAR = 1899;
var mPzStemArray = ["甲不开仓财物耗散", "乙不栽植千株不长", "丙不修灶必见灾殃", "丁不剃头头必生疮", "戊不受田田主不祥",
    "己不破券二比并亡", "庚不经络织机虚张", "辛不合酱主人不尝", "壬不汲水更难提防", "癸不词讼理弱敌强"];

var mPzBranchArray = ["子不问卜自惹祸殃", "丑不冠带主不还乡", "寅不祭祀神鬼不尝", "卯不穿井水泉不香", "辰不哭泣必主重丧", "巳不远行财物伏藏",
    "午不苫盖屋主更张", "未不服药毒气入肠", "申不安床鬼祟入房", "酉不宴客醉坐颠狂", "戌不吃犬作怪上床", "亥不嫁娶不利新郎"];
var CompassUnknown = -1;
var CompassNorth = 0;
var CompassNortheast = 1;
var CompassEast = 2;
var CompassSoutheast = 3;
var CompassSouth = 4;
var CompassSouthwest = 5;
var CompassWest = 6;
var CompassNorthwest = 7;
var CompassNames = ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"];
var ANIMAL = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
function querySAByDay(date) {
    var hlObj = {};
    var gzDay = getStemsBranchDay(date);
    var gzMonth = getStemsBranchMonth(date.getFullYear(), dayOfYear(date) - 1);
    var gzStr = getStemsBranchDayAsString(date);
    var fields = getYJSqlFields(date);
    var yi = "-", ji = "-";
    if (yjData[fields[1] + "-" + fields[0]]) {
        yi = yjData[fields[1] + "-" + fields[0]].y;//宜
        ji = yjData[fields[1] + "-" + fields[0]].j;//忌
        hlObj.yi = yi;
        hlObj.ji = ji;
    }
    var dayTg = gzDay % 10;
    var dayDz = gzDay % 12;
    var pzbj = mPzStemArray[dayTg] + " " + mPzBranchArray[dayDz];//彭祖百忌
    hlObj.pzbj = pzbj;
    var jsyq = ""; //
    var xsyj = "";//
    var value = (gzMonth + 10) % 12 + 1;
    if (jxData[value + "-" + gzStr]) {
        jsyq = jxData[value + "-" + gzStr].JSYQ;//吉神宜趋
        xsyj = jxData[value + "-" + gzStr].XSYJ;//凶神宜忌
        hlObj.jsyq = jsyq;
        hlObj.xsyj = xsyj;
    }
    var wx = "";//五行
    if (mWxMap[gzStr]) {
        wx = mWxMap[gzStr];
        hlObj.wx = wx;
    }
    var cs = cxInfoOfDateTime(date, -2); //冲煞
    hlObj.cs = cs;

    return hlObj;
}
// >>>>>
function dayCountOfMonth(month, isLeap) {
    switch (month + 1) {
        case 1:
            return 31;
            break;
        case 2:
            if (!isLeap) {
                return 28;
            }
            return 29;
            break;
        case 3:
            return 31;
            break;
        case 4:
            return 30;
            break;
        case 5:
            return 31;
            break;
        case 6:
            return 30;
            break;
        case 7:
            return 31;
            break;
        case 8:
            return 31;
            break;
        case 9:
            return 30;
            break;
        case 10:
            return 31;
            break;
        case 11:
            return 30;
            break;
        case 12:
            return 31;
            break;
        default:
            break;
    }
    return 0;
}
function codeForMonthDizhi(monthDizhi) {
    var zhiCode = { "子": 11, "丑": 12, "寅": 1, "卯": 2, "辰": 3, "巳": 4, "午": 5, "未": 6, "申": 7, "酉": 8, "戌": 9, "亥": 10 };
    return zhiCode[monthDizhi];
}
function taiShenWithCode(code, tgdzDay) {
    var codeString = code + "-" + tgdzDay;
    var taishen = fetusData[codeString];
    return taishen ? taishen : "暂无";
}

function dayOfYear(date) {
    var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var day = date.getDate();
    var month = date.getMonth(); //getMonth()是从0开始
    var year = date.getFullYear();
    var result = 0;
    for (var i = 0; i < month; i++) {
        result += dateArr[i];
    }
    result += day;
    //判断是否闰年
    if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        result += 1;
    }
    return result;
}
function getStemsBranchMonth(year, dayInYear) {
    var term = findPreTerm(year, dayInYear);
    var monthOffset = Math.floor((year - BASE_STEMS_YEAR) * 12 + (term + 2) / 2 - 2);
    var t = (monthOffset + 2) % 10;
    var b = (monthOffset + 2) % 12;
    return ((6 * t - 5 * b) + 60) % 60;
}
function getStemsBranchDay(date) {
    var dayOffset = getIntervalDays(BASE_STEMS_DATE, date);
    if (dayOffset > 0) {
        var t = parseInt((dayOffset + 9) % 10);
        var b = parseInt((dayOffset + 3) % 12);
        return ((6 * t - 5 * b) + 60) % 60;
    }
    return -1;
}
function getStemBranchHour(date, lunarHour) {
    var dayOffset = getIntervalDays(BASE_STEMS_DATE, date);
    var dt = (int)((dayOffset + 9) % 10);
    var hb = lunarHour;
    var ht = (hb + ((dt > 4) ? (dt - 5) : dt) * 2) % 10;
    var termHour = ((6 * ht - 5 * hb) + 60) % 60;
    return termHour;
}
function getIntervalDays(base_date, _date) {
    _date.setHours(0);
    _date.setMinutes(0);
    _date.setSeconds(0);
    _date.setMilliseconds(0);
    return Math.floor(Math.abs(base_date - _date) / (1000 * 60 * 60 * 24));
}

// 判断是三伏数九的那一天
// -1 一九 -2 二九 1 初伏 2 
var hanshuName = ['初伏', '中伏', '末伏', '一九', '二九', '三九', '四九', '五九', '六九', '七九', '八九', '九九'];

var hanshuData = {};
function isHanshu(calendar) {
    var year = calendar.getFullYear().toString();
    var hanshuArr = hanshu[year];
    var offset = dayOfYear(calendar);
    if (hanshuData[calendar]) {
        return hanshuData[calendar];
    }
    if (offset < 100) {
        hanshuArr = hanshu[year];
        for (var i = hanshuArr.length; i > 0; i--) {
            if (offset === hanshuArr[i]) {
                hanshuData[calendar] = hanshuName[i];
                return hanshuName[i];
            }
        }
    } else {
        for (var i = 0; i < hanshuArr.length; i++) {
            if (offset === hanshuArr[i]) {
                hanshuData[calendar] = hanshuName[i];
                return hanshuName[i];
            }
        }
    }
    return '';
}
var MIN = 1900;//最小年
var MAX = 2135;//最大年
// ?????
function findPreTerm(year, dayInYear) {
    var index = year - MIN;
    if (index > 0 && index < TermTable.length / 24) {
        var begin = index * 24;
        return findPreTerm1(TermTable, dayInYear, begin, 24);
    }
    return -1;
}
function findPreTerm1(termTable, dayInYear, begin, len) {
    var value = new Array(24);
    for (var j = begin; j <= begin + 23; j++) {
        value[j - begin] = termTable[j];
    }
    var index = -1, i = 0;
    for (i = 0; i < value.length; i++) {
        if (dayInYear === value[i]) {
            index = i;
            break;
        }
        else if (dayInYear < value[i]) {
            index = i - 1;
            break;
        }
    }
    if (i === value.length && index === -1) {
        index = i - 1;
    }
    return index;
}
function getStemsBranchHourAsString(date, index) {
    return formatStemsBranchString(getStemBranchHour(date, index));
}
function getStemsBranchDayAsString(date) {
    return formatStemsBranchString(getStemsBranchDay(date));
}
function formatStemsBranchString(index) {
    if (index < 0) {
        return "";
    }
    return Gan[index % 10] + Zhi[index % 12];
}
function getStemsBranchMonthAsString(year, dayInYear) {
    return formatBranchMonthString(getStemsBranchMonth(year, dayInYear));
}
function formatBranchMonthString(index) {
    if (index < 0) {
        return "";
    }
    return Zhi[index % 12];
}
var JXTable = [
    0xD2C, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCD2, 0xB34,//甲子，乙丑，丙寅，丁卯，戊辰，己巳，庚午，辛未，壬申，癸酉
    0x2DD, 0x4A3, 0xD2C, 0x34B, 0xCD2, 0xB34, 0x2C5, 0x4B2, 0xD2C, 0x34B,//甲戌，乙亥，丙子，丁丑，戊寅，己卯，庚辰，辛巳，壬午，癸未
    0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34A, 0xCD2, 0xB34, 0x2CD, 0x4B3,//甲申，乙酉，丙戌，丁亥，戊子，己丑，庚寅，辛卯，壬辰，癸巳
    0xD2C, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCD2, 0xB24,//甲午，乙未，丙申，丁酉，戊戌，己亥，庚子，辛丑，壬寅，癸卯
    0x2CD, 0x4A3, 0xD28, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4A3, 0xD2C, 0x34B,//甲辰，乙巳，丙午，丁未，戊申，己酉，庚戌，辛亥，壬子，癸丑
    0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCF2, 0xB34, 0x2CD, 0x4B3 //甲寅，乙卯，丙辰，丁巳，戊午，己未，庚申，辛酉，壬戌，癸亥
];
var JXStatusUnknown = -1;
var JXStatusJi = 0;
var JXStatusXiong = 1;
var JXNames = ["吉", "凶"];
/**
 * 计算当前时辰吉凶
 *
 * @param solar
 * @return
 */
function jixiongStatusOfDateTime(solar, hourNow) {
    var status = JXStatusUnknown;
    var stemIndex = getStemsBranchDay(solar);//[self.lunarMgr stemBranchDayOfSolarDate:solar];
    if (stemIndex > -1 && stemIndex < 60) {
        var hexValue = JXTable[stemIndex];
        var chineseHour = getLumarHourIndex(hourNow);//[datetime ylChineseNumHour];
        var moveCount = (11 - chineseHour);
        var value = (hexValue >> moveCount) & 0x1;
        status = value > 0 ? JXStatusJi : JXStatusXiong;
    }
    return getJXName(status);
}
function getLumarHourIndex(hour) {
    return (Math.floor(hour / 2) + hour % 2) % 12;
}
/**
 * 吉凶名称
 *
 * @param value
 * @return
 */
function getJXName(value) {
    if (value < 0 || value > JXNames.length) {
        return "";
    }
    return JXNames[value];
}
/**
 * 得到宜忌查询需要的参数
 * <p/>
 * param calendar
 * return
 */
function getYJSqlFields(calendar) {
    var field = ["-1", "-1"];
    var arr = twentyFourTermdaysOf(calendar);
    if (arr.length == 2) {
        var a = arr[0];
        var b = arr[1];
        var offsetDayCount = Math.floor(a % 2 == 0 ? a / 2 : a / 2 + 1);
        if (b > 0 && a % 2 == 0) {
            offsetDayCount += 1;
        }
        // 计算当前日期距离1901-1-1多少天
        var baseDate = new Date(1901, 0, 1); //JCalendar.createFromString("1901-01-01");
        var day = getIntervalDays(baseDate, calendar);
        field[0] = (15 + day) % 60 + "";
        field[1] = Math.floor(Math.abs((5 + day - offsetDayCount) % 12)) + "";
    }
    return field;
}
function twentyFourTermdaysOf(calendar) {
    try {
        var year = calendar.getFullYear();
        var yearOffset = year - 1900;
        var offset = dayOfYear(calendar) - 1;
        var index = 0;
        var st = 0;// 改日是否为24节气
        for (var i = 0; i < 24; i++) {
            var num = TermTable[yearOffset * 24 + i];
            if (num > offset) {
                index = i;
                st = 0;
                break;
            }
            else if (num == offset) {
                index = i;
                st = 1;
                break;
            }
        }
        var a = index + yearOffset * 24 - 24;// 莫日之前的节气数目
        var b = st;

        return [a, b];

    }
    catch (e) {
        return null;
    }
}
/**
 * 冲煞
 *
 * @param solar
 * @param lunar
 * @return
 */
function cxInfoOfDateTime(solar, lunar) {
    var branchIndex = branchIndexOfSolar(solar, lunar);
    var cindex = chongIndexOfDateTime(branchIndex);
    var sindex = shaDirectionOfDateTime(branchIndex);
    try {
        return ANIMAL[(cindex + 6) % 12] + "日冲" + ANIMAL[cindex] + " 煞" + CompassNames[sindex].replace("正", "");
    }
    catch (e) {
        return "";
    }
}
/**
 * branchIndex
 *
 * @param solar
 * @param hour  -2:ignoreTime -1:currenttime
 * @return
 */
function branchIndexOfSolar(solar, hour) {
    var branchIndex = -1;
    if (hour == -2) {
        return getBranchDay(solar);
    }
    //else if (hour == -1) {
    //    branchIndex = solar.getStemsBranchHour() % 12;
    //}
    else {
        branchIndex = getStemBranchHour(solar, hour) % 12;
    }
    return branchIndex;
}
function getBranchDay(solar) {
    var dayOffset = getIntervalDays(BASE_STEMS_DATE, solar);
    if (dayOffset > 0) {
        return Math.floor((dayOffset + 3) % 12);
    }
    return 0;
}
/**
 * 获取干支计时
 *
 * @param _date
 * @param lunarHour
 * @return
 */
function getStemBranchHour(_date, lunarHour) {
    var dayOffset = getIntervalDays(BASE_STEMS_DATE, _date);
    var dt = parseInt((dayOffset + 9) % 10);
    var hb = lunarHour;
    var ht = (hb + ((dt > 4) ? (dt - 5) : dt) * 2) % 10;
    var termHour = ((6 * ht - 5 * hb) + 60) % 60;
    return termHour;
}
/*
 子午相冲，丑未相冲，寅申相冲，辰戌相冲，巳亥相冲，卯酉相冲
 */
function chongIndexOfDateTime(branchIndex) {
    var value = -1;
    switch (branchIndex) {
        case 0:
            value = 6;
            break;
        case 1:
            value = 7;
            break;
        case 2:
            value = 8;
            break;
        case 3:
            value = 9;
            break;
        case 4:
            value = 10;
            break;
        case 5:
            value = 11;
            break;
        case 6:
            value = 0;
            break;
        case 7:
            value = 1;
            break;
        case 8:
            value = 2;
            break;
        case 9:
            value = 3;
            break;
        case 10:
            value = 4;
            break;
        case 11:
            value = 5;
            break;
        default:
            break;
    }
    return value;
}
/*
 逢巳日、酉日、丑日必是“煞东”；亥日、卯日、未日必“煞西”；申日、子日、辰日必“煞南”；寅日、午日、戌日必“煞北”
 */
function shaDirectionOfDateTime(branchIndex) {
    var value = CompassUnknown;
    switch (branchIndex) {
        case 0://子
        case 4://辰
        case 8://申
            value = CompassSouth;
            break;
        case 1://丑
        case 5://巳
        case 9://酉
            value = CompassEast;
            break;
        case 2://寅
        case 6://午
        case 10://戌
            value = CompassNorth;
            break;
        case 3://卯
        case 7://未
        case 11://亥
            value = CompassWest;
            break;
        default:
            break;
    }
    return value;
}
var mWxMap = {
    "甲子": "海中金",
    "乙丑": "海中金",
    "丙寅": "炉中火",
    "丁卯": "炉中火",
    "戊辰": "大林木",
    "己巳": "大林木",
    "庚午": "路旁土",
    "辛未": "路旁土",
    "壬申": "剑锋金",
    "癸酉": "剑锋金",
    "甲戌": "山头火",
    "乙亥": "山头火",
    "丙子": "涧下水",
    "丁丑": "涧下水",
    "戊寅": "城头土",
    "己卯": "城头土",
    "庚辰": "白腊金",
    "辛巳": "白腊金",
    "壬午": "杨柳木",
    "癸未": "杨柳木",
    "甲申": "泉中水",
    "乙酉": "泉中水",
    "丙戌": "屋上土",
    "丁亥": "屋上土",
    "戊子": "霹雳火",
    "己丑": "霹雳火",
    "庚寅": "松柏木",
    "辛卯": "松柏木",
    "壬辰": "长流水",
    "癸巳": "长流水",
    "甲午": "沙中金",
    "乙未": "沙中金",
    "丙申": "山下火",
    "丁酉": "山下火",
    "戊戌": "平地木",
    "己亥": "平地木",
    "庚子": "壁上土",
    "辛丑": "壁上土",
    "壬寅": "金箔金",
    "癸卯": "金箔金",
    "甲辰": "覆灯火",
    "乙巳": "覆灯火",
    "丙午": "天河水",
    "丁未": "天河水",
    "戊申": "大驿土",
    "己酉": "大驿土",
    "庚戌": "钗钏金",
    "辛亥": "钗钏金",
    "壬子": "桑拓木",
    "癸丑": "桑拓木",
    "甲寅": "大溪水",
    "乙卯": "大溪水",
    "丙辰": "沙中土",
    "丁巳": "沙中土",
    "戊午": "天上火",
    "己未": "天上火",
    "庚申": "石榴木",
    "辛酉": "石榴木",
    "壬戌": "大海水",
    "癸亥": "大海水"
};
var TermTable = [
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1900
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1901
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1902
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1903
    6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 327, 341, 356,//1904
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1905
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1906
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1907
    6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 327, 341, 356,//1908
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1909
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1910
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1911
    6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 326, 341, 356,//1912
    5, 19, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//1913
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1914
    5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1915
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356,//1916
    5, 19, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//1917
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1918
    5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1919
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356,//1920
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355,//1921
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1922
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1923
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356,//1924
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355,//1925
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1926
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1927
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1928
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1929
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1930
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1931
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1932
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1933
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1934
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1935
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1936
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1937
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1938
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1939
    5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1940
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1941
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1942
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1943
    5, 20, 35, 50, 65, 80, 95, 110, 125, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1944
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//1945
    5, 19, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//1946
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1947
    5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1948
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//1949
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//1950
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1951
    5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1952
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//1953
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355,//1954
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1955
    5, 20, 35, 50, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356,//1956
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//1957
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1958
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1959
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1960
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1961
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1962
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1963
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1964
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1965
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1966
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1967
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1968
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1969
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1970
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1971
    5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1972
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1973
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1974
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//1975
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1976
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1977
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355,//1978
    5, 19, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//1979
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1980
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1981
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//1982
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//1983
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//1984
    4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1985
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//1986
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355,//1987
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1988
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//1989
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//1990
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1991
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1992
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//1993
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1994
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1995
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//1996
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//1997
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//1998
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//1999
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//2000
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2001
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2002
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2003
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//2004
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2005
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2006
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2007
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//2008
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2009
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2010
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355,//2011
    5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//2012
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2013
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2014
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//2015
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//2016
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2017
    4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2018
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//2019
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355,//2020
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2021
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2022
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//2023
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2024
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2025
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2026
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2027
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2028
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2029
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2030
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2031
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2032
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2033
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2034
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2035
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2036
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2037
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2038
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2039
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2040
    4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354,//2041
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2042
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2043
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355,//2044
    4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354,//2045
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2046
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2047
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//2048
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354,//2049
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2050
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2051
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//2052
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354,//2053
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2054
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2055
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//2056
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354,//2057
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2058
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2059
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2060
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354,//2061
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2062
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2063
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2064
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354,//2065
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2066
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2067
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2068
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354,//2069
    4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354,//2070
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2071
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2072
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 279, 295, 310, 325, 339, 354,//2073
    4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354,//2074
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2075
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2076
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 279, 295, 310, 325, 339, 354,//2077
    4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354,//2078
    4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2079
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2080
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354,//2081
    4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354,//2082
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2083
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2084
    3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354,//2085
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354,//2086
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2087
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2088
    3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354,//2089
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354,//2090
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2091
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2092
    3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 294, 309, 324, 339, 354,//2093
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354,//2094
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2095
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2096
    3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 217, 233, 249, 264, 279, 294, 309, 324, 339, 354,//2097
    4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354,//2098
    4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354,//2099
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2100
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2101
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2102
    5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//2103
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//2104
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2105
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355,//2106
    5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 187, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//2107
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//2108
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2109
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355,//2110
    5, 20, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355,//2111
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//2112
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2113
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//2114
    5, 20, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355,//2115
    5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//2116
    4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2117
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355,//2118
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355,//2119
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356,//2120
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2121
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 311, 325, 340, 355,//2122
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2123
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//2124
    4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2125
    4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2126
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2127
    5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355,//2128
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2129
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2130
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355,//2131
    5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355,//2132
    4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355,//2133
    4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355,//2134
    5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355 //2135
];
var JQYearDate = {
    "2010": [4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2011": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355],
    "2012": [5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355],
    "2013": [4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2014": [4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2015": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2016": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355],
    "2017": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2018": [4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2019": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2020": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355],
    "2021": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2022": [4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2023": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2024": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355],
    "2025": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2026": [4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2027": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2028": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355],
    "2029": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2030": [4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355]
};
function GetSolarDateFromLunar(yearparam, monthparam, dayparam) {
    var isleappara = false;
    if (monthparam == "13") {
        isleappara = true;
        monthparam = leapMonth(parseInt(yearparam, 10));
    }
    return GetSolarFromLunar(yearparam, monthparam, dayparam, isleappara);
}
function GetSolarFromLunar(year, month, day, isLeap) {

    ///<summary>通过农历年月日，是否闰月得到阳历日期</summary>
    ///<return type="string" />

    ///思路 先计算农历距离1.1日的天数差

    year = parseInt(year, 10);
    month = parseInt(month, 10);
    day = parseInt(day, 10);

    var haveLeapmonth = leapMonth(year);
    var DayCounts = 0;
    var Diffrence = 0;
    for (var i = 1; i < month; i++) {
        DayCounts += monthDays(year, i);
    }
    if (haveLeapmonth > 0) {
        if (month > haveLeapmonth) {
            DayCounts += leapDays(year);
        }
        else {
            if (month == haveLeapmonth && isLeap) {
                DayCounts += monthDays(year, month);
            }
        }
    }
    DayCounts += day;

    var solarTolunar = new calendar(year, 0);
    var solarFirstDay = solarTolunar[0];

    var PreYearDayCount = 0;
    try {
        for (var j = 1; j < solarFirstDay.lMonth; j++) {
            PreYearDayCount += monthDays(solarFirstDay.lYear, j);
        }
    }
    catch (e) {
        alert(e.message);
    }
    if (solarFirstDay.isLeap) {
        PreYearDayCount += monthDays(solarFirstDay.lYear, solarFirstDay.lMonth);
    }
    PreYearDayCount += solarFirstDay.lDay;

    if (solarFirstDay.lYear < year) {
        var PreYearTotal = lYearDays(solarFirstDay.lYear);

        PreYearDayCount += leapDays(solarFirstDay.lYear);
        Diffrence = PreYearTotal - PreYearDayCount + DayCounts;
    }
    else {
        Diffrence = DayCounts - PreYearDayCount;
    }
    return DateCalculate(new Date(year, 0, 1), Diffrence, "d");
}
/*时间计算
 calculateDate:计算的时间基数 时间类型
 number:计算的参数  整形
 type  :类型 枚举类型
 返回时间类型
 */
function DateCalculate(calculateDate, number, type) {
    var calculateResult;
    switch (type) {
        case "s":
            calculateResult = new Date(Date.parse(calculateDate) + (1000 * parseInt(number)));
            break;
        case "m":
            calculateResult = new Date(Date.parse(calculateDate) + (60000 * parseInt(number)));
            break;
        case "h":
            calculateResult = new Date(Date.parse(calculateDate) + (3600000 * parseInt(number)));
            break;
        case "d":
            calculateResult = new Date(Date.parse(calculateDate) + (86400000 * parseInt(number)));
            break;
        case "w":
            calculateResult = new Date(Date.parse(calculateDate) + ((86400000 * 7) * parseInt(number)));
            break;
        case "M":
            calculateResult = new Date(calculateDate.getFullYear(), (calculateDate.getMonth()) + parseInt(number), calculateDate.getDate(),
                calculateDate.getHours(), calculateDate.getMinutes(), calculateDate.getSeconds());
            break;
        case "y":
            calculateResult = new Date(calculateDate.getFullYear() + parseInt(number), (calculateDate.getMonth()), calculateDate.getDate(),
                calculateDate.getHours(), calculateDate.getMinutes(), calculateDate.getSeconds());
            break;
    }
    return calculateResult;
}


module.exports = function getDayViewInfo(year, month, day) {
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
    if (month === 3 && day === 1) {
        jieriListString += '税收宣传月 ';
    }
    var hanshu = isHanshu(new Date(year, month, day))
    if (!!hanshu) {
        jieriListString += hanshu;
    }
    dayViewInfo['festivalInfo'] = jieriListString.trim();
    //农历日期
    var monthCN = (chooseMonthLunarInfo[day - 1].isLeap ? '闰 ' : '') + monthName[chooseMonthLunarInfo[day - 1].lMonth - 1]
        + cDay(chooseMonthLunarInfo[day - 1].lDay);
    dayViewInfo['lumarInfo1'] = monthCN + " " + weekListString[dayViewDate.getDay()] + ' ';
    var yearCN = chooseMonthLunarInfo[day - 1].cYear + '年 ' + chooseMonthLunarInfo[day - 1].cMonth + '月 '
        + chooseMonthLunarInfo[day - 1].cDay + '日';

    dayViewInfo['lumarInfo2'] = yearCN + "【属" + getPet(lYear, getLichunOffset(year, month, day)) + "】";

    var hlObj = querySAByDay(new Date(year, month, day));
    dayViewInfo['isVacation'] = getVacationClass(year, month + 1, day);
    dayViewInfo['huangli'] = querySAByDay(new Date(year, month, day));
    return dayViewInfo;
}