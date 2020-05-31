<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom">
          <h3>Website Settings</h3>
          <p style="padding: 5px 0;">Change global website settings here</p>

          <div class="row" style="padding-top:10px">
            <div class="col s24 no-pad">
              <div class="col s24 m16 no-pad">
                <div class="form-group">
                  <label for="exampleInputEmail1">
                    Website Name
                    <span class="red-text">*</span>
                  </label>
                  <input
                    type="text"
                    v-model="website_name"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
label {
  font-size: 13px;
  font-weight: 500;
  line-height: 30px;
  font-family: "Bold";
  white-space: nowrap;
}
</style>