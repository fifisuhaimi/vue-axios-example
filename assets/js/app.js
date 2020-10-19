function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");

    if ($.inArray(hash[0], vars) > -1) {
      vars[hash[0]] += "," + hash[1];
    } else {
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
  }

  return vars;
}

const API_BASE_URL = "http://localhost:3000/api";

let app = new Vue({
  el: "#app",
  data: {
    page: "index",
    student: {},
    students: [],
  },
  mounted: function () {
    console.log("Vue mounted!");
    this.page = $("#app").data("page");

    switch (this.page) {
      case "students":
        this.getStudents();
        break;
      case "edit": {
        console.log(getUrlVars()["id"]);
        this.getStudent(getUrlVars()["id"]);
        break;
      }
      default:
        break;
    }
  },
  methods: {
    getStudent: function (id) {
      let _this = this;
      axios.get(`${API_BASE_URL}/student/${id}`).then((res) => {
        switch (res.status) {
          case 200: {
            _this.student = res.data;
            break;
          }
          default: {
            break;
          }
        }
      });
    },
    getStudents: function () {
      let _this = this;

      axios.get(`${API_BASE_URL}/students`).then((res) => {
        switch (res.status) {
          case 200:
            _this.students = res.data;
            break;
          default:
            break;
        }
      });
    },
    addStudent: function () {
      this.student = {
        name: $("#name").val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
      };

      axios
        .post(`${API_BASE_URL}/student`, this.student, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          switch (res.status) {
            case 200: {
              $(".modal-title").html("Yeay");
              $(".modal-body").html(
                `<p>Student <b>${$(
                  "#name"
                ).val()}</b> successfully registered</p>`
              );
              $(".modal").modal("toggle");
              break;
            }
            default: {
              $(".modal-title").html(`Opps ${res.status}`);
              $(".modal-body").html(
                `<p>Something went wrong. Error:</p><pre>${res.error}</pre>`
              );
              $(".modal").modal("toggle");
              break;
            }
          }
        });
    },
    updateStudent: function (id) {
      this.student = {
        name: $("#name").val(),
        age: $("#age").val(),
        gender: $("#gender").val(),
      };

      axios
        .put(`${API_BASE_URL}/student/${id}`, this.student, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          switch (res.status) {
            case 200: {
              $(".modal-title").html("Yeay");
              $(".modal-body").html(
                `<p>Student <b>${$("#name").val()}</b> successfully updated</p>`
              );
              $(".modal").modal("toggle");
              break;
            }
            default: {
              $(".modal-title").html(`Opps ${res.status}`);
              $(".modal-body").html(
                `<p>Something went wrong. Error:</p><pre>${res.error}</pre>`
              );
              $(".modal").modal("toggle");
              break;
            }
          }
        });
    },
    deleteStudent: function (id) {
      axios.delete(`${API_BASE_URL}/student/${id}`).then((res) => {
        switch (res.status) {
          case 200: {
            $(".modal-title").html("Info");
            $(".modal-body").html(
              `<p>Student with id <b>${id}</b> successfully deleted</p>`
            );
            $(".modal").modal("toggle");
            break;
          }
          default: {
            $(".modal-title").html(`Opps ${res.status}`);
            $(".modal-body").html(
              `<p>Something went wrong. Error:</p><pre>${res.error}</pre>`
            );
            $(".modal").modal("toggle");
            break;
          }
        }
      });
    },
  },
});
