// 军机 / 通航 扩展数据（按 AeroPedia 合并计划新增）
// 该文件在 data.js 之后加载，向 FAMILIES 与 AIRCRAFT 追加新家族，
// 保证主页目录（FAMILIES）与上传自动归类（AIRCRAFT）都能识别新机型。
// 资料参考：公开厂家资料 / 百度百科，部分参数为典型值。
(function () {
  "use strict";

  /* ===================== 军机 ===================== */
  const MIL_FAMILIES = [
    {
      "id": "j20",
      "name": "歼-20 威龙",
      "manufacturer": "成都飞机工业（成飞）",
      "country": "中国",
      "category": "军机",
      "image": "images/j20.jpg",
      "wiki": "https://baike.baidu.com/item/歼-20",
      "desc": "歼-20 是中国自主研发的第五代隐身战斗机，采用鸭翼气动布局与内置弹舱，具备高隐身、高态势感知与超音速巡航能力，2011 年首飞，2017 年正式列装。",
      "variants": [
        {
          "id": "j20",
          "name": "歼-20",
          "sub": "标准型",
          "firstFlight": "2011",
          "seats": "1",
          "range": "约 5,500 km",
          "cruise": "约 2,100 km/h（超音速巡航）",
          "engines": "两台 涡扇-15（WS-15）",
          "wiki": "https://baike.baidu.com/item/歼-20",
          "nameEn": "Chengdu J-20",
          "subEn": "Standard version",
          "enginesEn": "Two Shenyang WS-15 turbofans"
        },
        {
          "id": "j20s",
          "name": "歼-20S",
          "sub": "双座型",
          "firstFlight": "2021",
          "seats": "2",
          "range": "约 5,500 km",
          "cruise": "约 2,100 km/h",
          "engines": "两台 涡扇-15（WS-15）",
          "wiki": "https://baike.baidu.com/item/歼-20",
          "nameEn": "Chengdu J-20S",
          "subEn": "Two-seat variant",
          "enginesEn": "Two Shenyang WS-15 turbofans"
        }
      ],
      "nameEn": "Chengdu J-20",
      "manufacturerEn": "Chengdu Aircraft",
      "countryEn": "China",
      "categoryEn": "Military aircraft",
      "descEn": "The Chengdu J-20 is China's fifth-generation stealth fighter, featuring a canard delta layout and internal weapon bays with high stealth, situational awareness and supersonic cruise. It first flew in 2011 and entered service in 2017."
    },
    {
      "id": "j10",
      "name": "歼-10 猛龙",
      "manufacturer": "成都飞机工业（成飞）",
      "country": "中国",
      "category": "军机",
      "image": "images/j10.jpg",
      "wiki": "https://baike.baidu.com/item/歼-10",
      "desc": "歼-10 是中国自主研发的第三代单发多用途战斗机，采用鸭式气动布局，2003 年服役，是中国空军与海军航空兵的主力战机之一。",
      "variants": [
        {
          "id": "j10a",
          "name": "歼-10A",
          "sub": "早期量产型",
          "firstFlight": "1998",
          "seats": "1",
          "range": "约 2,900 km",
          "cruise": "约 1,350 km/h",
          "engines": "一台 涡扇-10A（WS-10A）",
          "wiki": "https://baike.baidu.com/item/歼-10",
          "nameEn": "Chengdu J-10A",
          "subEn": "Early production variant",
          "enginesEn": "One Shenyang WS-10A turbofan"
        },
        {
          "id": "j10b",
          "name": "歼-10B",
          "sub": "改进型（DSI 进气道）",
          "firstFlight": "2008",
          "seats": "1",
          "range": "约 2,900 km",
          "cruise": "约 1,350 km/h",
          "engines": "一台 涡扇-10B（WS-10B）",
          "wiki": "https://baike.baidu.com/item/歼-10",
          "nameEn": "Chengdu J-10B",
          "subEn": "Improved variant (DSI inlet)",
          "enginesEn": "One Shenyang WS-10B turbofan"
        },
        {
          "id": "j10c",
          "name": "歼-10C",
          "sub": "有源相控阵雷达型",
          "firstFlight": "2013",
          "seats": "1",
          "range": "约 3,200 km",
          "cruise": "约 1,350 km/h",
          "engines": "一台 涡扇-10B（WS-10B）",
          "wiki": "https://baike.baidu.com/item/歼-10",
          "nameEn": "Chengdu J-10C",
          "subEn": "AESA radar variant",
          "enginesEn": "One Shenyang WS-10B turbofan"
        }
      ],
      "nameEn": "Chengdu J-10",
      "manufacturerEn": "Chengdu Aircraft",
      "countryEn": "China",
      "categoryEn": "Military aircraft",
      "descEn": "The Chengdu J-10 is China's third-generation single-engine multirole fighter with a canard delta layout. It entered service in 2003 and is a mainstay of the Chinese air force and naval aviation."
    },
    {
      "id": "j16",
      "name": "歼-16",
      "manufacturer": "沈阳飞机工业（沈飞）",
      "country": "中国",
      "category": "军机",
      "image": "images/j16.jpg",
      "wiki": "https://baike.baidu.com/item/歼-16",
      "desc": "歼-16 是在苏-27 基础上发展的双座双发重型多用途战斗机，载弹量大、航程远，可执行对空、对地、对海攻击任务，是空军远程打击的核心力量。",
      "variants": [
        {
          "id": "j16",
          "name": "歼-16",
          "sub": "双座多用途型",
          "firstFlight": "2011",
          "seats": "2",
          "range": "约 3,900 km",
          "cruise": "约 1,500 km/h",
          "engines": "两台 涡扇-10B（WS-10B）",
          "wiki": "https://baike.baidu.com/item/歼-16",
          "nameEn": "Shenyang J-16",
          "subEn": "Two-seat multirole",
          "enginesEn": "Two Shenyang WS-10B turbofans"
        },
        {
          "id": "j16d",
          "name": "歼-16D",
          "sub": "电子战型",
          "firstFlight": "2015",
          "seats": "2",
          "range": "约 3,900 km",
          "cruise": "约 1,500 km/h",
          "engines": "两台 涡扇-10B（WS-10B）",
          "wiki": "https://baike.baidu.com/item/歼-16",
          "nameEn": "Shenyang J-16D",
          "subEn": "Electronic warfare variant",
          "enginesEn": "Two Shenyang WS-10B turbofans"
        }
      ],
      "nameEn": "Shenyang J-16",
      "manufacturerEn": "Shenyang Aircraft",
      "countryEn": "China",
      "categoryEn": "Military aircraft",
      "descEn": "The Shenyang J-16 is a two-seat, twin-engine heavy multirole fighter developed from the Su-27, with large payload and long range for air, ground and sea strike missions."
    },
    {
      "id": "su",
      "name": "苏霍伊 Su 系列",
      "manufacturer": "苏霍伊设计局 (Sukhoi)",
      "country": "俄罗斯",
      "category": "军机",
      "image": "images/su-series.jpg",
      "wiki": "https://baike.baidu.com/item/苏-27",
      "desc": "苏霍伊设计局研制的系列战斗机与攻击机，以机动性强、载弹量大著称，代表型号包括 Su-27 侧卫、Su-30、Su-35 以及第五代 Su-57。",
      "variants": [
        {
          "id": "su27",
          "name": "苏-27 侧卫",
          "sub": "Su-27 Flanker",
          "firstFlight": "1977",
          "seats": "1",
          "range": "约 3,530 km",
          "cruise": "约 1,350 km/h",
          "engines": "两台 AL-31F 涡扇",
          "wiki": "https://baike.baidu.com/item/苏-27",
          "nameEn": "Sukhoi Su-27 Flanker",
          "subEn": "Su-27 Flanker",
          "enginesEn": "Two Saturn AL-31F turbofans"
        },
        {
          "id": "su30",
          "name": "苏-30",
          "sub": "双座多用途",
          "firstFlight": "1989",
          "seats": "2",
          "range": "约 3,000 km",
          "cruise": "约 1,350 km/h",
          "engines": "两台 AL-31F 涡扇",
          "wiki": "https://baike.baidu.com/item/苏-30",
          "nameEn": "Sukhoi Su-30",
          "subEn": "Two-seat multirole",
          "enginesEn": "Two Saturn AL-31F turbofans"
        },
        {
          "id": "su35",
          "name": "苏-35",
          "sub": "超机动型",
          "firstFlight": "2008",
          "seats": "1",
          "range": "约 3,600 km",
          "cruise": "约 1,400 km/h",
          "engines": "两台 AL-41F1S 矢量涡扇",
          "wiki": "https://baike.baidu.com/item/苏-35",
          "nameEn": "Sukhoi Su-35",
          "subEn": "Super-maneuverable",
          "enginesEn": "Two Saturn AL-41F1S thrust-vectoring turbofans"
        },
        {
          "id": "su57",
          "name": "苏-57",
          "sub": "第五代隐身",
          "firstFlight": "2010",
          "seats": "1",
          "range": "约 4,300 km",
          "cruise": "约 2,140 km/h（超音速巡航）",
          "engines": "两台 AL-41F1 / 拟换 Izdeliye 30",
          "wiki": "https://baike.baidu.com/item/苏-57",
          "nameEn": "Sukhoi Su-57",
          "subEn": "Fifth-generation stealth",
          "enginesEn": "Two AL-41F1 / Izdeliye 30 turbofans"
        }
      ],
      "nameEn": "Sukhoi Su family",
      "manufacturerEn": "Sukhoi",
      "countryEn": "Russia",
      "categoryEn": "Military aircraft",
      "descEn": "The Sukhoi family of fighters and attack aircraft is known for superb maneuverability and large payloads, including the Su-27 Flanker, Su-30, Su-35 and the fifth-generation Su-57."
    },
    {
      "id": "mig",
      "name": "米高扬 MiG 系列",
      "manufacturer": "米高扬设计局 (Mikoyan)",
      "country": "俄罗斯",
      "category": "军机",
      "image": "images/mig-series.jpg",
      "wiki": "https://baike.baidu.com/item/米格-29",
      "desc": "米高扬设计局的经典战斗机系列，以高速度与高空性能见长，代表型号有 MiG-29 支点、MiG-31 猎狐与 MiG-35。",
      "variants": [
        {
          "id": "mig29",
          "name": "米格-29 支点",
          "sub": "MiG-29 Fulcrum",
          "firstFlight": "1977",
          "seats": "1",
          "range": "约 1,430 km",
          "cruise": "约 1,500 km/h",
          "engines": "两台 RD-33 涡扇",
          "wiki": "https://baike.baidu.com/item/米格-29",
          "nameEn": "Mikoyan MiG-29 Fulcrum",
          "subEn": "MiG-29 Fulcrum",
          "enginesEn": "Two Klimov RD-33 turbofans"
        },
        {
          "id": "mig31",
          "name": "米格-31 猎狐",
          "sub": "MiG-31 Foxhound",
          "firstFlight": "1975",
          "seats": "2",
          "range": "约 3,000 km",
          "cruise": "约 2,500 km/h（超音速）",
          "engines": "两台 D-30F6 涡扇",
          "wiki": "https://baike.baidu.com/item/米格-31",
          "nameEn": "Mikoyan MiG-31 Foxhound",
          "subEn": "MiG-31 Foxhound",
          "enginesEn": "Two Soloviev D-30F6 turbofans"
        },
        {
          "id": "mig35",
          "name": "米格-35",
          "sub": "MiG-35",
          "firstFlight": "2007",
          "seats": "1",
          "range": "约 2,100 km",
          "cruise": "约 1,400 km/h",
          "engines": "两台 RD-33MK 涡扇",
          "wiki": "https://baike.baidu.com/item/米格-35",
          "nameEn": "Mikoyan MiG-35",
          "subEn": "MiG-35",
          "enginesEn": "Two Klimov RD-33MK turbofans"
        }
      ],
      "nameEn": "Mikoyan MiG family",
      "manufacturerEn": "Mikoyan",
      "countryEn": "Russia",
      "categoryEn": "Military aircraft",
      "descEn": "The Mikoyan MiG series is known for high speed and high-altitude performance, with notable types including the MiG-29 Fulcrum, MiG-31 Foxhound and MiG-35."
    },
    {
      "id": "tu",
      "name": "图波列夫 Tu 系列",
      "manufacturer": "图波列夫设计局 (Tupolev)",
      "country": "俄罗斯",
      "category": "军机",
      "image": "images/tu-series.jpg",
      "wiki": "https://baike.baidu.com/item/图-160",
      "desc": "图波列夫设计局的轰炸机与特种飞机系列，包含超音速轰炸机 Tu-22M、螺旋桨战略轰炸机 Tu-95 与超音速战略轰炸机 Tu-160。",
      "variants": [
        {
          "id": "tu22m",
          "name": "图-22M 逆火",
          "sub": "Tu-22M Backfire",
          "firstFlight": "1969",
          "seats": "4",
          "range": "约 6,800 km",
          "cruise": "约 2,300 km/h（超音速）",
          "engines": "两台 NK-25 涡扇",
          "wiki": "https://baike.baidu.com/item/图-22M",
          "nameEn": "Tupolev Tu-22M Backfire",
          "subEn": "Tu-22M Backfire",
          "enginesEn": "Two Kuznetsov NK-25 turbofans"
        },
        {
          "id": "tu95",
          "name": "图-95 熊",
          "sub": "Tu-95 Bear",
          "firstFlight": "1952",
          "seats": "6-10",
          "range": "约 15,000 km",
          "cruise": "约 800 km/h",
          "engines": "四台 NK-12 涡桨",
          "wiki": "https://baike.baidu.com/item/图-95",
          "nameEn": "Tupolev Tu-95 Bear",
          "subEn": "Tu-95 Bear",
          "enginesEn": "Four Kuznetsov NK-12 turboprops"
        },
        {
          "id": "tu160",
          "name": "图-160 海盗旗",
          "sub": "Tu-160 Blackjack",
          "firstFlight": "1981",
          "seats": "4",
          "range": "约 12,300 km",
          "cruise": "约 2,200 km/h（超音速）",
          "engines": "四台 NK-32 涡扇",
          "wiki": "https://baike.baidu.com/item/图-160",
          "nameEn": "Tupolev Tu-160 Blackjack",
          "subEn": "Tu-160 Blackjack",
          "enginesEn": "Four Kuznetsov NK-32 turbofans"
        }
      ],
      "nameEn": "Tupolev Tu family",
      "manufacturerEn": "Tupolev",
      "countryEn": "Russia",
      "categoryEn": "Military aircraft",
      "descEn": "The Tupolev family of bombers and special-mission aircraft includes the supersonic Tu-22M Backfire, the turboprop strategic Tu-95 Bear and the supersonic strategic Tu-160 Blackjack."
    },
    {
      "id": "an",
      "name": "安东诺夫 An 系列",
      "manufacturer": "安东诺夫设计局 (Antonov)",
      "country": "乌克兰",
      "category": "军机",
      "image": "images/an-series.jpg",
      "wiki": "https://baike.baidu.com/item/安-124",
      "desc": "安东诺夫设计局研制的大型运输机系列，以巨型载重能力闻名，包括 An-22、An-124 鲁斯兰，以及史上最大的飞机 An-225 哥萨克（仅 1 架，2022 年损毁）。",
      "variants": [
        {
          "id": "an22",
          "name": "安-22 公鸡",
          "sub": "An-22 Cock",
          "firstFlight": "1965",
          "seats": "—",
          "range": "约 5,000 km",
          "cruise": "约 740 km/h",
          "engines": "四台 NK-12 涡桨",
          "wiki": "https://baike.baidu.com/item/安-22",
          "nameEn": "Antonov An-22 Cock",
          "subEn": "An-22 Cock",
          "enginesEn": "Four Kuznetsov NK-12 turboprops"
        },
        {
          "id": "an124",
          "name": "安-124 鲁斯兰",
          "sub": "An-124 Ruslan",
          "firstFlight": "1982",
          "seats": "—",
          "range": "约 5,400 km",
          "cruise": "约 800 km/h",
          "engines": "四台 D-18T 涡扇",
          "wiki": "https://baike.baidu.com/item/安-124",
          "nameEn": "Antonov An-124 Ruslan",
          "subEn": "An-124 Ruslan",
          "enginesEn": "Four Progress D-18T turbofans"
        },
        {
          "id": "an225",
          "name": "安-225 哥萨克",
          "sub": "An-225 Mriya（仅 1 架）",
          "firstFlight": "1988",
          "seats": "—",
          "range": "约 15,400 km",
          "cruise": "约 800 km/h",
          "engines": "六台 D-18T 涡扇",
          "wiki": "https://baike.baidu.com/item/安-225",
          "nameEn": "Antonov An-225 Mriya",
          "subEn": "An-225 Mriya (single built)",
          "enginesEn": "Six Progress D-18T turbofans"
        }
      ],
      "nameEn": "Antonov An family",
      "manufacturerEn": "Antonov",
      "countryEn": "Ukraine",
      "categoryEn": "Military aircraft",
      "descEn": "The Antonov family of heavy transport aircraft is famous for enormous payloads, including the An-22, the An-124 Ruslan and the An-225 Mriya, the largest aircraft ever built (single airframe, destroyed in 2022)."
    },
    {
      "id": "y20",
      "name": "运-20 鲲鹏",
      "manufacturer": "西安飞机工业（西飞）",
      "country": "中国",
      "category": "军机",
      "image": "images/y20.jpg",
      "wiki": "https://baike.baidu.com/item/运-20",
      "desc": "运-20 是中国自主研发的大型军用运输机，绰号“鲲鹏”，2013 年首飞，2016 年列装，大幅提升了中国空军的战略投送与远程救灾能力。",
      "variants": [
        {
          "id": "y20",
          "name": "运-20A",
          "sub": "标准型",
          "firstFlight": "2013",
          "seats": "—",
          "range": "约 7,800 km",
          "cruise": "约 800 km/h",
          "engines": "四台 涡扇-20（WS-20）/ 早期 D-30KP-2",
          "wiki": "https://baike.baidu.com/item/运-20",
          "nameEn": "Xian Y-20A",
          "subEn": "Standard version",
          "enginesEn": "Four Shenyang WS-20 / early D-30KP-2 turbofans"
        },
        {
          "id": "y20u",
          "name": "运-20U",
          "sub": "空中加油型",
          "firstFlight": "2021",
          "seats": "—",
          "range": "约 7,800 km",
          "cruise": "约 800 km/h",
          "engines": "四台 涡扇-20（WS-20）",
          "wiki": "https://baike.baidu.com/item/运-20",
          "nameEn": "Xian Y-20U",
          "subEn": "Aerial refueling variant",
          "enginesEn": "Four Shenyang WS-20 turbofans"
        }
      ],
      "nameEn": "Xian Y-20",
      "manufacturerEn": "Xian Aircraft",
      "countryEn": "China",
      "categoryEn": "Military aircraft",
      "descEn": "The Xian Y-20 is China's domestically developed heavy military transport, nicknamed 'Kunpeng'. It first flew in 2013 and entered service in 2016, greatly boosting the PLAAF's strategic airlift and disaster-relief reach."
    }
  ];

  /* ===================== 通航 ===================== */
  const GA_FAMILIES = [
    {
      "id": "ga",
      "name": "通用航空",
      "manufacturer": "塞斯纳 / 西锐 / 罗宾逊",
      "country": "美国",
      "category": "通航",
      "image": "images/cessna172.jpg",
      "wiki": "https://baike.baidu.com/item/塞斯纳172",
      "desc": "通用航空指除军事与商业定期航班外的飞行活动，涵盖私人小飞机、教练机、公务机与直升机等，是航空文化的重要组成部分。",
      "variants": [
        {
          "id": "cessna172",
          "name": "塞斯纳 172 天鹰",
          "sub": "Cessna 172 Skyhawk",
          "firstFlight": "1955",
          "seats": "4",
          "range": "约 1,186 km",
          "cruise": "约 226 km/h",
          "engines": "一台 莱康明 IO-360 活塞",
          "wiki": "https://baike.baidu.com/item/塞斯纳172",
          "nameEn": "Cessna 172 Skyhawk",
          "subEn": "Cessna 172 Skyhawk",
          "enginesEn": "One Lycoming IO-360 piston"
        },
        {
          "id": "sr22",
          "name": "西锐 SR22",
          "sub": "Cirrus SR22",
          "firstFlight": "2000",
          "seats": "4",
          "range": "约 1,930 km",
          "cruise": "约 341 km/h",
          "engines": "一台 大陆 IO-550 活塞",
          "wiki": "https://baike.baidu.com/item/西锐SR22",
          "nameEn": "Cirrus SR22",
          "subEn": "Cirrus SR22",
          "enginesEn": "One Continental IO-550 piston"
        },
        {
          "id": "r44",
          "name": "罗宾逊 R44",
          "sub": "Robinson R44 直升机",
          "firstFlight": "1990",
          "seats": "4",
          "range": "约 560 km",
          "cruise": "约 210 km/h",
          "engines": "一台 莱康明 IO-540 活塞",
          "wiki": "https://baike.baidu.com/item/罗宾逊R44",
          "nameEn": "Robinson R44",
          "subEn": "Robinson R44 helicopter",
          "enginesEn": "One Lycoming IO-540 piston"
        }
      ],
      "nameEn": "General Aviation",
      "manufacturerEn": "Cessna / Cirrus / Robinson",
      "countryEn": "USA",
      "categoryEn": "General aviation",
      "descEn": "General aviation covers all flying except military and scheduled commercial flights, including private and trainer aircraft, business jets and helicopters — a vital part of aviation culture."
    }
  ];

  /* 把家族变平铺进 AIRCRAFT（供上传自动归类使用） */
  function flatten(families) {
    const out = [];
    families.forEach((f) => {
      (f.variants || []).forEach((v) => {
        out.push({
          familyId: f.id,
          familyName: f.name,
          familyNameEn: f.nameEn,
          manufacturer: f.manufacturer,
          manufacturerEn: f.manufacturerEn,
          country: f.country,
          countryEn: f.countryEn,
          category: f.category,
          categoryEn: f.categoryEn,
          image: f.image,
          familyDesc: f.desc,
          familyDescEn: f.descEn,
          familyWiki: f.wiki,
          id: v.id,
          name: v.name,
          nameEn: v.nameEn,
          sub: v.sub,
          subEn: v.subEn,
          firstFlight: v.firstFlight,
          seats: v.seats,
          range: v.range,
          cruise: v.cruise,
          engines: v.engines,
          enginesEn: v.enginesEn,
          wiki: v.wiki
        });
      });
    });
    return out;
  }

  const NEW_FAMILIES = MIL_FAMILIES.concat(GA_FAMILIES);
  if (typeof FAMILIES !== "undefined") {
    FAMILIES.push.apply(FAMILIES, NEW_FAMILIES);
  }
  if (typeof AIRCRAFT !== "undefined") {
    AIRCRAFT.push.apply(AIRCRAFT, flatten(NEW_FAMILIES));
  }
})();
