<template>
  <section class="section has-background-dark" style="min-height: 100vh;">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <div class="box has-background-grey-dark has-text-centered">
            <h1 class="title is-2 has-text-light mb-4">
              🎭 Validador de Tickets
            </h1>
            <p class="subtitle is-5 has-text-grey-light mb-5">
              Carnaval de Oruro 2025
            </p>
            
            <div class="notification is-info is-light">
              <p class="mb-3">
                Este es el sistema de validación de tickets para el Carnaval de Oruro 2025.
              </p>
              <p>
                Escanea el código QR de tu ticket o ingresa el ID manualmente.
              </p>
            </div>

            <div class="field has-addons has-addons-centered mt-5">
              <div class="control">
                <input 
                  class="input is-large" 
                  type="text" 
                  placeholder="Ej: XDL-209-783"
                  v-model="ticketInput"
                  @keyup.enter="validateTicket"
                >
              </div>
              <div class="control">
                <button class="button is-warning is-large" @click="validateTicket">
                  Validar
                </button>
              </div>
            </div>

            <div class="mt-6">
              <p class="has-text-grey-light is-size-7">
                Para más información visita 
                <a href="https://carnaval-oruro.com" class="has-text-warning">carnaval-oruro.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const router = useRouter()
const ticketInput = ref('')

const validateTicket = () => {
  if (ticketInput.value.trim()) {
    router.push(`/ticket/${ticketInput.value.trim()}`)
  }
}
</script>