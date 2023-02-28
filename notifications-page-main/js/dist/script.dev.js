"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var posts = [];

var fetchPosts = function fetchPosts() {
  return regeneratorRuntime.async(function fetchPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch('/js/data.json').then(function (res) {
            return res.json();
          }).then(function (prom) {
            posts.push.apply(posts, _toConsumableArray(prom));
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

var postsDisplay = function postsDisplay() {
  return regeneratorRuntime.async(function postsDisplay$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetchPosts());

        case 2:
          document.querySelector('.notifs').innerHTML = posts.map(function (post) {
            var action = "";
            var message = "";
            var target = "";
            var comm_picture = false;
            var ref_img_link = "";

            switch (post.action.type) {
              case "reaction":
                action = "reacted to your recent post ";
                target = post.action.which;
                break;

              case "follow":
                action = "followed you";
                break;

              case "join":
                action = "joined your ";
                target = post.action.name;
                break;

              case "message":
                action = "sent you a private message";
                message = post.action.content;
                break;

              case "comment":
                if (post.action.what == "picture") {
                  comm_picture = true;
                  action = "commented on your picture";
                  ref_img_link = post.action.link;
                }

                break;

              case "left":
                action = "left the group", target = post.action.name;
                break;

              default:
                action = "";
                break;
            }

            ;
            return "\n    <div class=\"notif ".concat(!post.seen ? "notSeen" : "", "\">\n      <div class=\"headInf\">\n        <div class=\"user_image\">\n          <img src=\"").concat(post.user_image, "\" alt=\"").concat(post.user_image, "\"\" >\n        </div>\n        <div class=\"heading\">\n          <div class=\"cont\">\n            <strong class=\"username cursor\">").concat(post.username, "</strong>\n            ").concat(action, "\n            <strong class=\"cursor\">").concat(target, "</strong>").concat(!post.seen ? "<li class=\"notRead\"></li>" : "", "\n          </div>\n          <div class=\"time\">\n            ").concat(post.post_date, "\n          </div>\n        </div>\n        ").concat(comm_picture ? "<div class=\"comm_pict cursor\"><img src=\"".concat(ref_img_link, "\" alt=\"").concat(ref_img_link, "\"\" ></div>") : "", "\n        \n      </div>\n      ").concat(message != "" ? "\n      <div class=\"message\">\n      ".concat(message, "\n</div>") : "", "\n      \n    </div>");
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

postsDisplay();
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var allreadBtn = document.getElementById('all_read');
    var notread = Array.from(document.querySelectorAll('.notSeen'));
    var notreadSignal = Array.from(document.querySelectorAll('.notRead'));
    allreadBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var i = 0;

      var _loop = function _loop(_i) {
        setTimeout(function () {
          notread[_i].classList.remove('notSeen');

          notreadSignal[_i].style.display = "none";
        }, _i * 200);
      };

      for (var _i = 0; _i < notread.length; _i++) {
        _loop(_i);
      }

      notread.forEach(function (r) {
        i += 200;
      });
    });
    var i = 0;
    notread.forEach(function (el) {
      el.addEventListener('click', function (e) {
        el.children[0].children[1].children[0].children[2].style.display = "none";
        el.classList.remove("notSeen");
      });
    });
  }, 2000);
});