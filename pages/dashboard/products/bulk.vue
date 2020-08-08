<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom">
          <h3 style="display: flex;align-items: center;">Add Products in Bulk.</h3>
          <p
            style="padding-left: 19px;padding-bottom: 10px;"
          >You can download a general Excel file format for all Category of Products. The only contrait is to correctly add the category, subcategory in the field</p>
          <button
            class="btn btn-red"
            style="display: flex;align-items: center;margin-left: 19px;margin-bottom: 10px;"
          >
            <i style="height: 18px;" data-feather="download"></i>
            <p class="padding-left-10 white-text">Download Format</p>
          </button>
        </div>
      </div>

      <div class="holder">
        <h3 class>Upload Excel</h3>
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <div style="padding-left: 19px;padding-bottom: 10px;" class>
            <label class="file">
              <input
                type="file"
                ref="file"
                id="file"
                aria-label="File browser example"
                @change="handleFileUpload"
              />
              <span class="file-custom"></span>
            </label>
            <button @click="submitFile" class="btn btn-primary">Add Products</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-component",
  data() {
    return {
      file: "",
    };
  },
  mounted() {},

  methods: {
    submitFile() {

      let formData = new FormData();

      formData.append("file", this.file);
      axios
        .post("/single-file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    handleFileUpload: function () {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>


<style scoped>
select,
input,
textarea {
  height: 35px;
  font-family: "Regular";
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  border: 1px solid rgb(169, 169, 169);
  transition: all 0.3s;
}

h3 {
  font-size: 20px;
  padding-left: 19px;
  padding-bottom: 10px;
}

h4 {
  font-size: 25px;

  padding-left: 19px;
  padding-bottom: 10px;
}

.holder {
  margin-bottom: 20px;
}

label {
  font-size: 13px;
  font-weight: 500;
  line-height: 30px;
  font-family: "Bold";
  white-space: nowrap;
}

/* .form-group{
  display: flex;
    justify-content: space-between;
    align-items: baseline;
} */

.form-group {
  display: flex;
  flex-direction: column;
}

::-webkit-input-placeholder {
  /* Edge */
  color: #afafaf;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #afafaf;
}

::placeholder {
  color: #afafaf;
}

.link_tag {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}

.element-tab-view {
  position: relative;
}

.element-tab-view > input {
  display: none;
}
.element-tab-view > input:checked + label {
  background: #fff;
  color: #4caf50;
}
.element-tab-view > input#tab1:checked ~ .line {
  left: 0%;
}
.element-tab-view > input#tab1:checked ~ .content-container #c1 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > input#tab2:checked ~ .line {
  left: 136.146px;
}
.element-tab-view > input#tab2:checked ~ .content-container #c2 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > input#tab3:checked ~ .line {
  left: 270.646px;
}
.element-tab-view > input#tab3:checked ~ .content-container #c3 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > input#tab4:checked ~ .line {
  left: 406.802px;
}
.element-tab-view > input#tab4:checked ~ .content-container #c4 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > input#tab5:checked ~ .line {
  left: 542.948px;
}
.element-tab-view > input#tab5:checked ~ .content-container #c5 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > label {
  display: inline-block;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  width: 130px;
  text-align: center;
  background: #fff;
  color: #555;
  position: relative;
  -webkit-transition: 0.25s background ease;
  transition: 0.25s background ease;
  cursor: pointer;
  font-family: "Regular";
}
.element-tab-view > label::after {
  content: "";
  height: 2px;
  width: 100%;
  position: absolute;
  display: block;
  background: #fff;
  bottom: 0;
  opacity: 0;
  left: 0;
  -webkit-transition: 0.25s ease;
  transition: 0.25s ease;
}
.element-tab-view > label:hover::after {
  opacity: 1;
}
.element-tab-view > .line {
  position: absolute;
  background: #4caf50;
  width: 130px;
  top: 56px;
  left: 0;
  -webkit-transition: 0.25s ease;
  transition: 0.25s ease;
  height: 3px;
  top: 57px;
  z-index: 99;
}
.element-tab-view > .content-container {
  background: #fff;
  position: relative;
  /* height: 100px; */
  font-size: 16px;
  border-top: 1px solid #dbdbdb;
}
.element-tab-view > .content-container .content {
  position: absolute;
  /* padding: 10px; */
  width: 100%;
  top: 0;
  opacity: 0;
  -webkit-transition: 0.25s ease;
  transition: 0.25s ease;
  color: #333;
}
.element-tab-view > .content-container .content h3 {
  font-weight: 200;
  margin: 10px 0;
}
.element-tab-view > .content-container .content p {
  margin: 10px 0;
}
.element-tab-view > .content-container .content p,
.element-tab-view > .content-container .content i {
  font-size: 13px;
}

.toggle-button-cover {
  display: table-cell;
  position: relative;
  width: 200px;
  /* height: 140px; */
  box-sizing: border-box;
}

.button-cover {
  /* height: 100px; */
  margin: 20px;
  background-color: #fff;
  /* box-shadow: 0 10px 20px -8px #c5d6d6; */
  border-radius: 4px;
}

/* .button-cover:before {
  counter-increment: button-counter;
  content: counter(button-counter);
  position: absolute;
  right: 0;
  bottom: 0;
  color: #d7e3e3;
  font-size: 12px;
  line-height: 1;
  padding: 5px;
} */

.button-cover,
.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.button {
  position: relative;
  top: 50%;
  width: 74px;
  height: 36px;
  margin: -20px auto 0 auto;
  overflow: hidden;
}

.button.r,
.button.r .layer {
  border-radius: 100px;
}

.button.b2 {
  border-radius: 2px;
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knobs {
  z-index: 2;
}

.layer {
  width: 100%;
  background-color: #efefef;
  transition: 0.3s ease all;
  z-index: 1;
}

/* Button 3 */
#button-3 .knobs:before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 11px 4px;
  background-color: #b5b5b5;
  border-radius: 50%;
  transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
}

#button-3 .checkbox:active + .knobs:before {
  width: 46px;
  border-radius: 100px;
}

#button-3 .checkbox:checked:active + .knobs:before {
  margin-left: -26px;
}

#button-3 .checkbox:checked + .knobs:before {
  content: "";
  left: 42px;
  background-color: #2196f3;
}

#button-3 .checkbox:checked ~ .layer {
  background-color: #d4ecff;
}

.red-text {
  color: red;
}

@media (min-width: 767.98px) {
  .form-group.small {
    width: 180px;
  }
}

.input_span_right {
  position: absolute;
  right: 0;
  top: 31px;
  bottom: 0;
  /* margin: auto 0; */
  width: 72px;
  height: 33px;
  background-color: #2196f3;
  line-height: 33px;
  text-align: center;
  border-radius: 0;
  color: white;
}

.file {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 2.5rem;
}
.file input {
  min-width: 14rem;
  margin: 0;
  filter: alpha(opacity=0);
  opacity: 0;
}
.file-custom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 0.075rem solid #ddd;
  border-radius: 0.25rem;
  box-shadow: inset 0 0.2rem 0.4rem rgba(0, 0, 0, 0.05);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.file-custom:after {
  content: "Choose file...";
}
.file-custom:before {
  position: absolute;
  top: -0.075rem;
  right: -0.075rem;
  bottom: -0.075rem;
  z-index: 6;
  display: block;
  content: "Browse";
  height: 2.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #eee;
  border: 0.075rem solid #ddd;
  border-radius: 0 0.25rem 0.25rem 0;
}

/* Focus */
.file input:focus ~ .file-custom {
  box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.2rem #0074d9;
}
</style>
