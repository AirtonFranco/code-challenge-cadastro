<template>
  <div id="app" class="container">
    <b-alert
      show
      dismissible
      v-for="mensagem in mensagens"
      :key="mensagem.texto"
      :variant="mensagem.tipo"
    >{{mensagem.texto}}</b-alert>
    <b-card>
      <b-form-group label="Nome*">
        <b-form-input type="text" size="lg" v-model="usuario.nome" placeholder="Informe seu Nome"></b-form-input>
      </b-form-group>

      <b-form-group label="CNPJ*">
        <the-mask
          :mask="['##.###.###/####-##']"
          class="form-control display-7"
          v-model="usuario.cnpj"
          placeholder="Informe seu CNPJ"
        />
      </b-form-group>
      <b-form-group label="Email" id="input-group-1" label-for="input-1">
        <b-form-input
          type="email"
          size="lg"
          id="input-1"
          v-model="usuario.email"
          required="required"
          placeholder="Informe seu Email"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Endereco*">
        <b-form-input
          class="form-control display-7"
          v-model="usuario.address"
          placeholder="Informe seu Endereço"
        ></b-form-input>
      </b-form-group>
      <b-button @click="getLocation" size="lg" variant="primary">Carregar Mapa</b-button>
      <hr />
      <b-button @click="salvar" size="lg" variant="success">Enviar</b-button>
    </b-card>
    <hr />
  </div>
</template>

<script>
import axios from "axios";
import { TheMask } from "vue-the-mask";
export default {
  components: { TheMask },
  data() {
    return {
      mensagens: [],
      usuarios: [],
      id: null,
      usuario: {
        nome: "", //Obrigatorio
        cnpj: "", //Obrigatorio
        cnpj: "",
        email: "",
        address: "",
      },
    };
  },
  methods: {
    limpar() {
      (this.usuario.nome = ""),
        (this.usuario.cnpj = ""),
        (this.usuario.cep = ""),
        (this.usuario.email = ""),
        (this.id = null);
      this.mensagens = [];
    },
    openFileDialog() {
      this.$refs.input.value = null;
      this.$refs.input.click();
    },
    handleFile({ target }) {
      this.usuario.img = target.files[0];
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );
            // console.log(position.coords.latitude);
            // console.log(position.coords.longitude);
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Browser nao suporta");
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyC4ytUWVC5tXOiiqhP56ZbWYtI99ntONn4"
        )
        .then((response) => {
          if (response.data.error_message) {
            console.log(response.data.error_message);
          } else {
            // this.address = response.data.results[0].formatted_address;
            console.log(response.data.results[0].formatted_address);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    //Adicionando usuarios - Metodo POST
    salvar() {
      const metodo = this.id ? "patch" : "post";
      const finalUrl = this.id ? `/${this.id}` : "";
      this.$http[metodo](
        `http://localhost:3001/usuarios${finalUrl}`,
        this.usuario
      ).then(() => {
        this.limpar();
        this.mensagens.push({
          texto: "Obrigado, cadastro realizado com sucesso",
          tipo: "success",
        });
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
</style>
