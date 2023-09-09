const express = require('express');
const http = require('http');
const bookman = require("bookman");
const handlebars = require("express-handlebars");
const url = require("url");
const Discord = require("discord.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handlebarshelpers = require("handlebars-helpers")();
const path = require("path");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const session = require("express-session");
const client = new Discord.Client();
const randomString = require("random-string");
const db = (global.db = {});

let ranks = ["jsV11", "jsV12","jsV13","jsV14","androidstudio", "arduino", "sablon", "topluluk", "api"];
for (let rank in ranks) {
  db[ranks[rank]] = new bookman(ranks[rank]);
}
//MaximusBoys  Code
const IDler = {
  botID: "904062512864063599",
  botToken: "OTA0MDYyNTEyODY0MDYzNTk5.GsusZe.45vHGosZSl3taHio6IaQtYEzExVq_TpwVuZyaA",
  botSecret: "CfMnLZ3z8uPeHv8ihVpB17WKwYAsMVdm",
  botCallbackURL: "https://robotmotion.glitch.me/callback",
  callbackurl: "https://robotmotion.glitch.me/callback",
  sunucuID: "899737112730038292",
  sunucuDavet: "discord.gg/tbjBmKUCvC",
  kodLogKanalı: "1058022446034329610",
  sahipRolü: "1028336041557491803",
  adminRolü: "1038151045072822303",
  kodPaylaşımcıRolü: "1038151045072822303",
  boosterRolü: "901495596911841331",
  kodPaylaşamayacakRoller: ["1028642705271689267"],
  sablonRolü: "1028362503278837770",
  arduinoKodlarRolü: "1028362503278837770",
  androidstudioKodlarRolü: "1028362503278837770",
  jsV11KodlarRolü: "1028362503278837770",
  jsV12KodlarRolü: "1028362503278837770",
  jsV13KodlarRolü: "1028362503278837770",
  jsV14KodlarRolü: "1028362503278837770"

};
//MaximusBoys  Code
const app = express();

//MaximusBoys  Code
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  })
);
app.use(cookieParser());
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/layouts/`,
    helpers: handlebarshelpers
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
const scopes = ["identify", "guilds"];
passport.use(
  new Strategy(
    {
      clientID: IDler.botID,
      clientSecret: IDler.botSecret,
      callbackURL: IDler.botCallbackURL,
      scope: scopes
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  )
);
app.use(
  session({
    secret: "secret-session-thing",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/giris",
  passport.authenticate("discord", {
    scope: scopes
  })
);
app.get(
  "/callback",
  passport.authenticate("discord", {
    failureRedirect: "/error"
  }),
  (req, res) => {
    res.redirect("/");
  }
);
app.get("/cikis", (req, res) => {
  req.logOut();
  return res.redirect("/");
});
app.get("/davet", (req, res) => {
  res.redirect(IDler.sunucuDavet);
});

/* SAYFALAR BURADAN İTİBAREN */
app.get("/", (req, res) => {
  res.render("index", {
    user: req.user
  });
});

app.get("/jsV11", (req, res) => {
  var data = db.jsV11.get("kodlar");
  data = sortData(data);
      
  res.render("jsV11", {
    user: req.user,
    kodlar: data
  });
});
app.get("/jsV11/:id", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 137,
          message: "Kodları görebilmek için discord sunucumuza katılmanız | Siteye giriş yapmanız gerekmektedir."

        }
      })
    );

  var id = req.params.id;
  if (!id) req.redirect("/");
  let data = db.jsV11.get("kodlar");
  var code = findCodeToId(data, id);
  if (code) {
    res.render("kod", {
      user: req.user,
      kod: code
    });
  } else {
    res.redirect("/");
  }
});

app.get("/jsV12", (req, res) => {
  var data = db.jsV12.get("kodlar");
  data = sortData(data);
      
  res.render("jsV12", {
    user: req.user,
    kodlar: data
  });
});
app.get("/jsV12/:id", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 137,
          message: "Kodları görebilmek için discord sunucumuza katılmanız | Siteye giriş yapmanız gerekmektedir."

        }
      })
    );

  var id = req.params.id;
  if (!id) req.redirect("/");
  let data = db.jsV12.get("kodlar");
  var code = findCodeToId(data, id);
  if (code) {
    res.render("kod", {
      user: req.user,
      kod: code
    });
  } else {
    res.redirect("/");
  }
});

app.get("/jsV13", (req, res) => {
  var data = db.jsV13.get("kodlar");
  data = sortData(data);
      
  res.render("jsV13", {
    user: req.user,
    kodlar: data
  });
});
app.get("/jsV13/:id", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 137,
          message: "Kodları görebilmek için discord sunucumuza katılmanız | Siteye giriş yapmanız gerekmektedir."

        }
      })
    );

  var id = req.params.id;
  if (!id) req.redirect("/");
  let data = db.jsV13.get("kodlar");
  var code = findCodeToId(data, id);
  if (code) {
    res.render("kod", {
      user: req.user,
      kod: code
    });
  } else {
    res.redirect("/");
  }
});

app.get("/jsV14", (req, res) => {
  var data = db.jsV14.get("kodlar");
  data = sortData(data);
      
  res.render("jsV14", {
    user: req.user,
    kodlar: data
  });
});
app.get("/jsV14/:id", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 137,
          message: "Kodları görebilmek için discord sunucumuza katılmanız | Siteye giriş yapmanız gerekmektedir."

        }
      })
    );

  var id = req.params.id;
  if (!id) req.redirect("/");
  let data = db.jsV14.get("kodlar");
  var code = findCodeToId(data, id);
  if (code) {
    res.render("kod", {
      user: req.user,
      kod: code
    });
  } else {
    res.redirect("/");
  }
});

app.get("/androidstudio", (req, res) => {
  var data = db.androidstudio.get("kodlar");
  data = sortData(data);
  res.render("androidstudio", {
    user: req.user,
    kodlar: data
  });
});
app.get("/androidstudio/:id", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 137,
          message: "Kodları görebilmek için discord sunucumuza katılmanız | Siteye giriş yapmanız gerekmektedir."

        }
      })
    );

  var id = req.params.id;
  if (!id) req.redirect("/");
  let data = db.androidstudio.get("kodlar");
  var code = findCodeToId(data, id);
  if (code) {
    let guild = client.guilds.cache.get(IDler.sunucuID);
    let member = req.user ? guild.members.cache.get(req.user.id) : null;
    if (
      member &&
      (member.roles.cache.has(IDler.androidstudioKodlarRolü) ||
        member.roles.cache.has(IDler.boosterRolü) ||
        member.roles.cache.has(IDler.sahipRolü) ||
        member.roles.cache.has(IDler.kodPaylaşımcıRolü) ||
        member.roles.cache.has(IDler.adminRolü))
    ) {
      res.render("kod", {
        user: req.user,
        kod: code
      });
    } else {
      res.redirect(
        url.format({
          pathname: "/hata",
          query: {
            statuscode: 501,
            message: "Bu kodu görmek için gerekli yetkiniz yok."
          }
        })
      );
    }
  } else {
    res.redirect("/");
  }
});
app.get("/arduino", (req, res) => {
  var data = db.arduino.get("kodlar");
  data = sortData(data);
  res.render("arduino", {
    user: req.user,
    kodlar: data
  });
});
app.get("/arduino/:id", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 137,
          message: "Kodları görebilmek için discord sunucumuza katılmanız | Siteye giriş yapmanız gerekmektedir."
        }
      })
    );

  var id = req.params.id;
  if (!id) req.redirect("/");
  let data = db.arduino.get("kodlar");
  var code = findCodeToId(data, id);
  if (code) {
    let guild = client.guilds.cache.get(IDler.sunucuID);
    let member = req.user ? guild.members.cache.get(req.user.id) : null;
    if (
      member &&
      (member.roles.cache.has(IDler.arduinoKodlarRolü) ||
        member.roles.cache.has(IDler.boosterRolü) ||
        member.roles.cache.has(IDler.sahipRolü) ||
        member.roles.cache.has(IDler.kodPaylaşımcıRolü) ||
        member.roles.cache.has(IDler.adminRolü))
    ) {
      res.render("kod", {
        user: req.user,
        kod: code
      });
    } else {
      res.redirect(
        url.format({
          pathname: "/hata",
          query: {
            statuscode: 501,
            message: "Bu kodu görmek için gerekli rolünüz yok."
          }
        })
      );
    }
  } else {
    res.redirect("/");
  }
});
app.get("/sablon", (req, res) => {
  var data = db.sablon.get("kodlar");
  data = sortData(data);
  res.render("sablon", {
    user: req.user,
    kodlar: data
  });
});
app.get("/sablon/:id", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 137,
          message: "Kodları görebilmek için discord sunucumuza katılmanız | Siteye giriş yapmanız gerekmektedir."
        }
      })
    );

  var id = req.params.id;
  if (!id) req.redirect("/");
  let data = db.sablon.get("kodlar");
  var code = findCodeToId(data, id);
  if (code) {
    let guild = client.guilds.cache.get(IDler.sunucuID);
    let member = req.user ? guild.members.cache.get(req.user.id) : null;
    if (
      member &&
      (member.roles.cache.has(IDler.hazırSistemlerRolü) ||
        member.roles.cache.has(IDler.boosterRolü) ||
        member.roles.cache.has(IDler.sahipRolü) ||
        member.roles.cache.has(IDler.kodPaylaşımcıRolü) ||
        member.roles.cache.has(IDler.adminRolü))
    ) {
      res.render("kod", {
        user: req.user,
        kod: code
      });
    } else {
      res.redirect(
        url.format({
          pathname: "/hata",
          query: {
            statuscode: 501,
            message: "Bu kodu görmek için gerekli rolünüz yok."
          }
        })
      );
    }
  } else {
    res.redirect("/");
  }
});
app.get("/topluluk", (req, res) => {
  var data = db.topluluk.get("kodlar");
  data = sortData(data);
  res.render("topluluk", {
    user: req.user,
    kodlar: data
  });
});
app.get("/topluluk/:id", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 137,
          message: "Kodları görebilmek için discord sunucumuza katılmanız | Siteye giriş yapmanız gerekmektedir."
        }
      })
    );

  var id = req.params.id;
  if (!id) req.redirect("/");
  let data = db.topluluk.get("kodlar");
  var code = findCodeToId(data, id);
  if (code) {
    res.render("kod", {
      user: req.user,
      kod: code
    });
  } else {
    res.redirect("/");
  }
});
app.get("/profil/:id", (req, res) => {
  let id = req.params.id;
  let member = client.guilds.cache.get(IDler.sunucuID).members.cache.get(id);
  if (!member)
    res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 501,
          message: "Belirtilen profil bulunamadı."
        }
      })
    );
  else {
    let perms = {
      androidstudio:
        member.roles.cache.has(IDler.sahipRolü) ||
        member.roles.cache.has(IDler.adminRolü) ||
        member.roles.cache.has(IDler.kodPaylaşımcıRolü) ||
        member.roles.cache.has(IDler.boosterRolü) ||
        member.roles.cache.has(IDler.androidstudioKodlarRolü) ||
        member.roles.cache.has(IDler.hazırSistemlerRolü),
      arduino:
        member.roles.cache.has(IDler.sahipRolü) ||
        member.roles.cache.has(IDler.adminRolü) ||
        member.roles.cache.has(IDler.kodPaylaşımcıRolü) ||
        member.roles.cache.has(IDler.boosterRolü) ||
        member.roles.cache.has(IDler.arduinoKodlarRolü) ||
        member.roles.cache.has(IDler.hazırSistemlerRolü),
      sablon:
        member.roles.cache.has(IDler.sahipRolü) ||
        member.roles.cache.has(IDler.adminRolü) ||
        member.roles.cache.has(IDler.kodPaylaşımcıRolü) ||
        member.roles.cache.has(IDler.boosterRolü) ||
        member.roles.cache.has(IDler.hazırSistemlerRolü) ||
        member.roles.cache.has(IDler.hazırAltyapılarRolü),
      destekçi: member.roles.cache.has(IDler.boosterRolü),
      yetkili:
        member.roles.cache.has(IDler.sahipRolü) ||
        member.roles.cache.has(IDler.adminRolü) ||
        member.roles.cache.has(IDler.kodPaylaşımcıRolü)
    };
    res.render("profil", {
      user: req.user,
      member: member,
      avatarURL: member.user.avatarURL(),
      perms: perms,
      stats: db.api.get(`${member.user.id}`)
    });
  }
});

app.get("/sil/:rank/:id", (req, res) => {
  if (req.user) {
    let member = client.guilds.cache
      .get(IDler.sunucuID)
      .members.cache.get(req.user.id);
    if (!member) {
      res.redirect(
        url.format({
          pathname: "/hata",
          query: {
            statuscode: 502,
            message: "Bu sayfayı görmek için gerekli yetkiye sahip değilsiniz."
          }
        })
      );
    } else {
      if (
        member.roles.cache.has(IDler.sahipRolü)
      ) {
        let id = req.params.id;
        if (!id) {
          res.redirect(
            url.format({
              pathname: "/hata",
              query: {
                statuscode: 504,
                message: "Bir kod idsi belirtiniz."
              }
            })
          );
        }
        let rank = req.params.rank;
        if (!rank) {
          res.redirect(
            url.format({
              pathname: "/hata",
              query: {
                statuscode: 504,
                message: "Bir kod türü belirtiniz."
              }
            })
          );
        }

        var rawId = findCodeToId(db[rank].get("kodlar"), id);
        if (!rawId)
          res.redirect(
            url.format({
              pathname: "/hata",
              query: {
                statuscode: 504,
                message: "Böyle bir kod bulunamadı."
              }
            })
          );
        else {
          if (req.user) db.api.add(`${req.user.id}.silinen`, 1);
          db[rank].delete("kodlar." + rawId.isim);
          res.redirect("/");
        }
      } else {
        res.redirect(
          url.format({
            pathname: "/hata",
            query: {
              statuscode: 502,
              message: "Bu sayfayı görmek için gerekli yetkiye sahip değilsiniz."
            }
          })
        );
      }
    }
  } else {
    res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 501,
          message: "Bu sayfayı görmek için giriş yapmalısınız."
        }
      })
    );
  }
});

app.get("/bilgilendirme", (req, res) => {
  res.render("bilgilendirme", {
    user: req.user
  });
});

app.get("/paylas", (req, res) => {
  if (
    !req.user ||
    !client.guilds.cache.get(IDler.sunucuID).members.cache.has(req.user.id)
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 138,
          message:
            "Kod paylaşabilmek için discord sunucumuza katılmanız ve siteye giriş yapmanız gerekmektedir."
        }
      })
    );
  res.render("kod_paylas", {
    user: req.user
  });
});
app.post("/paylasim", (req, res) => {
  let guild = client.guilds.cache.get(IDler.sunucuID);
  let member = req.user ? guild.members.cache.get(req.user.id) : null;
  let rank = "topluluk";
  if (
    member &&
    IDler.kodPaylaşamayacakRoller.some(id => member.roles.cache.has(id))
  )
    return res.redirect(
      url.format({
        pathname: "/hata",
        query: {
          statuscode: 502,
          message: "Kod Paylaşma İznin Yok!"
        }
      })
    );
  if (
    member &&
    (member.roles.cache.has(IDler.sahipRolü) ||
      member.roles.cache.has(IDler.kodPaylaşımcıRolü) ||
      member.roles.cache.has(IDler.adminRolü))
  )
    rank = req.body.kod_rank;

  let auht = [];
  if (req.user) auht.push(req.user);
  let auth_arr = req.body.author.split(",");

  auth_arr.forEach(auth => {
    let user = client.users.cache.get(auth);
    auht.push(req.user);
  });

  let obj = {
    author: req.auth,
    isim: req.body.kod_adi,
    id: randomString({ length: 10 }),
    desc: req.body.desc,
    modules: req.body.modules.split(","),
    icon: req.user
      ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`
      : `https://cdn.discordapp.com/icons/${IDler.sunucuID}/a_830c2bcfa4f1529946e82f15441a1227.jpg`,
    main_code: req.body.main_code,
    komutlar_code: req.body.komutlar_code,
    kod_rank: rank,
    k_adi: req.user.username,
    date: new Date(Date.now()).toLocaleDateString()
  };
  if (req.user) db.api.add(`${req.user.id}.paylasilan`, 1);
  db[obj.kod_rank].set(`kodlar.${obj.isim}`, obj);
  client.channels.cache.get(IDler.kodLogKanalı).send(
    new Discord.MessageEmbed()
    .setColor("#ffc000")
    .setFooter(client.guilds.cache.get(IDler.sunucuID).name, client.guilds.cache.get(IDler.sunucuID).iconURL({ dynamic: true, size: 2048}))
    .setTimestamp()
    .setAuthor("> Bir Kod Paylaşıldı!",client.user.avatarURL)
    .addField("> Kod Bilgileri",`> **Adı:** ${obj.isim} \n> **Açıklaması:** ${obj.desc} \n> **Değeri:** ${obj.kod_rank} \n> **Paylaşan:** ${obj.k_adi}`)
    .addField("> Kod Sayfası", `[Tıkla!](https://www.robotmotioncode.glitch.me/${obj.kod_rank}/${obj.id})`));
    res.redirect(`/${obj.kod_rank}/${obj.id}`);
});

function findCodeToId(data, id) {
  var keys = Object.keys(data);
  keys = keys.filter(key => data[key].id == id)[0];
  keys = data[keys];
  return keys;
}

function sortData(object) {
  var keys = Object.keys(object);
  var newData = {};
  var arr = [];
  keys.forEach(key => {// sup pothc :)
    arr.push(key);
  });
  arr.reverse();
  arr.forEach(key => {
    newData[key] = object[key];
  })
  return newData;
}

app.get("/hata", (req, res) => {
  res.render("hata", {
    user: req.user,
    statuscode: req.query.statuscode,
    message: req.query.message
  });
});

app.use((req, res) => {
  const err = new Error("Not Found");
  err.status = 404;
  return res.redirect(
    url.format({
      pathname: "/hata",
      query: {
        statuscode: 404,
        message: "Sayfa Bulunamadı"
      }
    })
  );
});

client.login(IDler.botToken);

client.on("ready", () => {
  const listener = app.listen(process.env.PORT, function() {
    console.log("Proje Hazır!");
  });
});

