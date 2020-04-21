<template>
  <div class="navbar-spacing padding-top-30">
    <div v-show="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Add Carousel Item</h3>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Title</label>
            <input v-model="detailtitle" type="text" style="width:70%" />
          </div>

          <div class="form-control">
            <label>offer_text</label>
            <input v-model="offer_text" type="text" style="width:70%" />
          </div>

          <div class="form-control">
            <label>Sub-Title</label>
            <input v-model="subtitle" type="text" style="width:70%" />
          </div>

          <div class="form-control">
            <label>Image</label>
            <input type="file" ref="fileInput" style="width:70%" />
          </div>

          <div class="form-control">
            <label>url</label>
            <input v-model="url" type="text" style="width:70%" />
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="addCarouselDetail">Save</div>
          <div class="pointer" @click="closeDropdownPanel">Cancel</div>
        </div>
      </div>
    </div>
    <div v-show="editDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Edit Carousel Item</h3>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Title</label>
            <input v-model="editingCarouselDetails.title" type="text" style="width:70%" />
          </div>

          <div class="form-control">
            <label>offer_text</label>
            <input v-model="editingCarouselDetails.offer_text" type="text" style="width:70%" />
          </div>

          <div class="form-control">
            <label>Sub-Title</label>
            <input v-model="editingCarouselDetails.subtitle" type="text" style="width:70%" />
          </div>

          <div class="form-control">
            <label>Image</label>
            <img
              style="object-fit:contain;height: 100px"
              :src="editingCarouselDetails.img"
              @error="setFallbackImageUrl"
            />
            <input type="file" @change="handleFileUpload()" ref="fileInput" style="width:70%" />
          </div>

          <div class="form-control">
            <label>url</label>
            <input v-model="editingCarouselDetails.url" type="text" style="width:70%" />
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="saveCarouselDetail">Save</div>
          <div class="pointer" @click="editDropdown = false">Cancel</div>
        </div>
      </div>
    </div>
    <div class="holder">
      <div class="row">
        <div class="col s24">
          <div class="padding-bottom-15" style="display: flex;justify-content: space-between;">
            <h3>{{title}}</h3>
            <!-- <button class="btn btn-red white-text" @click="saveOption">Save</button> -->
          </div>
        </div>
        <div class="col s24">
          <div class="padding-top-15">
            <div class="row card-view-row">
              <div class="col s8 l6" v-for="p in allCarouselDetails" :key="p.id">
                <div class="carousel-card">
                  <div class="viewed_image">
                    <img :src="p.img" @error="setFallbackImageUrl" />
                  </div>
                  <div class="viewed_content text-center">
                    <div class="viewed_name">
                      <p class="offer-title clamp1">{{ p.title }}</p>
                      <p class="offer-text clamp1">{{ p.offer_text }}</p>
                      <p class="offer-subtitle clamp1">{{ p.subtitle }}</p>
                      <a
                        style="text-decoration: none; color: #3f51b5; margin-bottom: 10px"
                        class="offer-subtitle clamp2"
                        target="_blank"
                        :href="origin + p.url"
                      >{{origin}}{{p.url}}</a>
                      <button
                        type="button"
                        @click="editCarouselDetail(p.id)"
                        class="btn btn-primary"
                      >Edit</button>
                      <button
                        type="button"
                        @click="deleteCarouselDetail(p.id)"
                        class="btn btn-red white-text"
                      >Delete</button>
                    </div>
                    <div class="viewed_price">
                      <!-- ₹{{ q.price }}
                      <span v-if="q.price < q.mrp">₹{{ p.mrp }}</span>-->
                    </div>
                  </div>
                </div>
              </div>
              <div class="col s8 l6">
                <div @click="openDropdownPanel" class="carousel-card add">
                  <p>+ Add</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allCarouselDetails: [],
      editingCarouselDetails: {},
      title: "",
      baseurl: process.env.baseUrl,

      showDropdown: false,
      editDropdown: false,
      origin: "https://wenslink.com/search",
      title: "",
      detailtitle: "",
      offer_text: "",
      subtitle: "",
      img: "",
      url: ""
    };
  },
  mounted() {
    this.gethomepagecarouseldetails();
    this.$store.dispatch("gethomepagecarousel").then(res => {
      console.log(res);
      this.title = res.data.title;
    });
  },
  methods: {
    handleFileUpload: function() {
      this.img = this.$refs.fileInput.files[0];
    },
    gethomepagecarouseldetails: function() {
      this.$store.dispatch("gethomepagecarouseldetails").then(res => {
        console.log(res);
        this.allCarouselDetails = res.data;
      });
    },
    addCarouselDetail: function() {
      var payload = new FormData();

      payload.append("home_carousel", this.$cookies.get("customizeCarousel"));
      payload.append("title", this.detailtitle);
      payload.append("offer_text", this.offer_text);
      payload.append("subtitle", this.subtitle);
      payload.append("url", this.url);
      payload.append("img", this.img);

      // title: this.detailtitle,
      // offer_text: this.offer_text,
      // subtitle: this.subtitle,
      // url: this.url,

      this.$store
        .dispatch("gethomepagecarouseldetailscreate", payload)
        .then(res => {
          console.log(res);
          this.gethomepagecarouseldetails();
          this.closeDropdownPanel();
        });
    },
    openDropdownPanel: function() {
      this.showDropdown = true;
    },
    closeDropdownPanel: function() {
      this.showDropdown = false;
      this.detailtitle = "";
      this.offer_text = "";
      this.subtitle = "";
      this.img = "";
      this.url = "";
    },
    deleteCarouselDetail: function(id) {
      this.$store.dispatch("deletehomepagecarousel", id).then(res => {
        this.gethomepagecarouseldetails();
        this.editDropdown = false;
      });
    },
    editCarouselDetail: function(id) {
      this.editingCarouselDetails = this.allCarouselDetails.filter(
        v => v.id === id
      )[0];
      this.editDropdown = true;

      console.log(this.$refs.fileInput.files.length);
    },
    saveCarouselDetail: function(id) {
      var payload = new FormData();

      payload.append("title", this.editingCarouselDetails.title);
      payload.append("offer_text", this.editingCarouselDetails.offer_text);
      payload.append("subtitle", this.editingCarouselDetails.subtitle);
      payload.append("url", this.editingCarouselDetails.url);

      if (this.$refs.fileInput.files.length == 1) {
        payload.append("img", this.$refs.fileInput.files[0]);
      }

      var id = this.editingCarouselDetails.id;

      console.log(payload);

      this.$store
        .dispatch("edithomepagecarousel", { payload, id })
        .then(res => {
          this.gethomepagecarouseldetails();
          this.editDropdown = false;
        });
    }
  }
};
</script>

<style scoped>
.carousel-card {
  border: 1px dashed #e0e0e0;
  border-radius: 2px;
  padding: 10px;
}
.carousel-card.add {
  border: 1px dashed #e0e0e0;
  border-radius: 2px;
  padding: 10px;
  height: 311px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.carousel-card.add > p {
  font-size: 15px;
  font-weight: bold;
}
.viewed_image img {
  height: 200px;
  width: 100%;
  object-fit: contain;
}

.offer-title {
  font-weight: bold;
  font-size: 15px;
  padding: 5px 0;
}

.offer-text {
  color: green;
  padding: 5px 0;
}

.offer-subtitle {
  padding: 5px 0;
  color: #333;
}

.text-center {
  text-align: center;
}

.card-view-row > .col:nth-child(4n) {
  padding-right: 0;
}

.card-view-row > .col:nth-child(4n + 1) {
  padding-left: 0;
}

.card-view-row > .col {
  padding-bottom: 20px;
}

.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

.popup-main {
  background-color: white;
  margin: auto;
  position: absolute;
  max-width: 400px;
  height: 460px;
  left: 260px;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 5px;
}

.popup-body {
  height: 300px;
  overflow: auto;
  padding: 30px;
}

.popup-title {
  padding: 30px 30px 16px;
  border-bottom: 1px solid #00000024;
}
.popup-action {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 25px;
  box-shadow: 0px -7px 10px 0px #0000000d;
}

.popup:after {
  background-color: rgba(0, 0, 0, 0.83);
  margin: auto;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

input,
select {
  height: 35px;
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  transition: all 0.3s;
}
</style>