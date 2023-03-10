export default {
  countries: ["by", "am", "ru", "ua"],
  currencies: {
    by: "BYN",
    am: "AMD",
    ru: "RUB",
    ua: "UAH",
  },
  supported_countries: {
    by: {
      support_phone: "+375445163914",
      cities: [
        "Minsk",
        "Gomel",
        "Brest",
        "Grodno",
        "Mogilev",
        "Vitebsk",
        "Lida",
        "Baranovichi",
        "Kobrin",
        "Dzierzhinsk",
        "Fanipol",
        "Astravyets",
        "Molodechno",
        "Polotsk",
        "Novopolotsk",
        "Orsha",
        "Barysaw",
        "Stolin",
        "Pinsk",
        "Bobruysk",
      ],
      locations: {
        Minsk: ["53.89118", "27.61657"],
        Gomel: ["53.89118", "27.61657"],
        Brest: ["53.89118", "27.61657"],
        Grodno: ["53.89118", "27.61657"],
        Mogilev: ["53.89118", "27.61657"],
        Vitebsk: ["53.89118", "27.61657"],
        Lida: ["53.89118", "27.61657"],
        Baranovichi: ["53.89118", "27.61657"],
        Kobrin: ["53.89118", "27.61657"],
        Dzierzhinsk: ["53.89118", "27.61657"],
        Fanipol: ["53.89118", "27.61657"],
        Astravyets: ["53.89118", "27.61657"],
        Molodechno: ["54.307332", "26.838939"],
        Polotsk: ["55.485576", "28.768349"],
        Novopolotsk: ["55.545302", "28.607394"],
        Orsha: ["54.511825", "30.404904"],
        Barysaw: ["54.14", "28.30"],
        Stolin: ["51.892508", "26.835619"],
      },
      payment_fields: {},
      lat: "53.89118",
      lng: "27.61657",
      phone_prefix: "+375",
      phone_zeroes: "+375000000000",
      phone_input_regex: "\\+375\\d{9}",
      phone_regex: "\\+?375(\\d{2})(\\d{3})(\\d{2})(\\d{2})/g",
      phone_regex_replace: "+375 ($1) $2-$3-$4",
      unn_validation_url: true,
      subscriptions: ["region", "silver", "gold", "platinum"],
      timezones: ["Europe/Minsk"],
      locales: ["ru_BY"],
    },
    am: {
      support_phone: "+375445163914",
      cities: ["Yerevan", "Gyumri"],
      payment_fields: {},
      lat: "40.1809",
      lng: "44.5215",
      phone_prefix: "+374",
      phone_zeroes: "+37400000000",
      phone_input_regex: "\\+374\\d{8}",
      phone_regex: "\\+?374(\\d{2})(\\d{2})(\\d{2})(\\d{2})/g",
      phone_regex_replace: "+374 ($1) $2-$3-$4",
      subscriptions: ["silver", "gold", "platinum", "vip"],
      timezones: ["Asia/Yerevan"],
      locales: ["hy_AM"],
    },
    ru: {
      support_phone: "+375445163914",
      cities: ["NizhnyNovgorod", "Yekaterinburg"],
      payment_fields: {
        kpp: "",
        corrAccount: "",
        kbk: "00000000000000000130",
      },
      lat: "56.331932",
      lng: "44.023225",
      phone_prefix: "+7",
      phone_zeroes: "+70000000000",
      phone_input_regex: "\\+7\\d{10}",
      phone_regex: "\\+?7(\\d{3})(\\d{3})(\\d{2})(\\d{2})/g",
      phone_regex_replace: "+7 $1 $2-$3-$4",
      subscriptions: ["silver", "gold", "platinum"],
      timezones: [
        "Asia/Sakhalin",
        "Asia/Ust-Nera",
        "Asia/Magadan",
        "Asia/Srednekolymsk",
        "Asia/Kamchatka",
        "Asia/Anadyr",
        "Asia/Yekaterinburg",
        "Asia/Omsk",
        "Asia/Novosibirsk",
        "Asia/Novokuznetsk",
        "Asia/Irkutsk",
        "Asia/Yakutsk",
        "Asia/Vladivostok",
        "Europe/Kaliningrad",
        "Europe/Moscow",
        "Europe/Volgograd",
        "Europe/Samara",
        "Europe/Ulyanovsk",
      ],
      locales: ["ru_RU"],
    },
    ua: {
      support_phone: "+380636205050",
      cities: ["Kiev"],
      payment_fields: {},
      lat: "50.402398",
      lng: "30.532735",
      phone_prefix: "+380",
      phone_zeroes: "+380000000000",
      phone_input_regex: "\\+380\\d{9}",
      phone_regex: "\\+?380(\\d{2})(\\d{3})(\\d{2})(\\d{2})/g",
      phone_regex_replace: "+380 ($1) $2-$3-$4",
      subscriptions: ["silver", "gold", "platinum", "vip"],
      timezones: ["Europe/Kiev"],
      locales: ["uk_UA"],
    },
  },
  language: "ru",
  supported_languages: ["ru", "en"],
  unn_validation_url: false,
  supported_attractions: {
    aerobics: "Aerobics",
    afro_dance: "Afro Dances",
    aqua_aerobic: "Aqua Aerobic",
    archery: "Archery",
    argentina_tango: "Argentina Tango",
    badminton: "??????????????????",
    belly_dance: "Belly Dance",
    bike_rental: "Bike Rental",
    bodiflex: "bodiflex",
    body_ballet: "Body Ballet",
    bosu: "Bosu",
    boxing: "boxing",
    callanetics: "Callanetics",
    capueiro: "Capueiro",
    carting: "Carting",
    "climbing wall": "Climbing wall",
    crossfit: "CROSSFIT",
    cycling: "Cycling",
    dance: "Dance",
    dynamic_meditation_osho: "Dynamic meditation (Osho)",
    ems: "EMS training",
    fitness: "Fitness",
    football: "Football",
    functional_training: "Functional Training",
    "gym club": "Gym",
    gym_trainer: "Gym with Personal Trainer",
    horse_riding: "Horse Riding",
    horse_walking: "Horse Walking",
    jumping: "Jumping",
    ice_skating: "Ice Skating",
    kangoo_jumping: "Kangoo Jumping",
    karate: "Karate",
    kickboxing: "Kickboxing",
    kung_fu: "Kung Fu",
    "martial arts": "Martial Arts",
    massage: "Massage",
    mini_golf: "Mini Golf",
    mma: "Mixed Martial Arts",
    muay_thai: "Muay Thai",
    pilates: "Pilates",
    pole_dance: "Pole Dance",
    pool_trainer: "Pool with Personal Trainer",
    roller_blade_rental: "Roller Blade Rental",
    "salt cave": "Salt Cave",
    sauna: "Sauna",
    shaping: "Shaping",
    shooting: "Shooting",
    spa: "??????",
    squash: "Squash",
    step_aerobics: "Step Aerobics",
    strength_training: "Strength Training",
    stretching: "Stretching",
    strip_dance: "Strip Dance",
    supboard: "??????????????",
    swimming_pool: "Swimming Pool",
    table_tennis: "Table Tennis",
    tai_bo: "Tai Bo",
    tai_chi: "Tai Chi",
    tennis: "Tennis",
    trampoline_park: "Trampoline Park",
    trx: "Suspension training (TRX)",
    wakeboard: "????????????????",
    winter_sports: "???????????? ???????? ????????????",
    workout: "Workout",
    yoga: "Yoga",
    zumba: "Zumba",
  },
};
