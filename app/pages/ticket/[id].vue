<template>
  <section class="section has-background-dark" style="min-height: 100vh;">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-10-tablet is-8-desktop">
          
          <!-- Loading -->
          <div v-if="loading" class="box has-text-centered">
            <div class="loader-wrapper">
              <div class="loader"></div>
              <p class="mt-4 has-text-grey-light">Validando ticket...</p>
            </div>
          </div>

          <!-- Ticket Válido -->
          <div v-else-if="ticket" class="box has-background-grey-dark">
            <div class="notification is-success is-light has-text-centered mb-5">
              <p class="title is-4">✓ Ticket Válido</p>
              <p>Este ticket es auténtico y está activo</p>
            </div>

            <div class="ticket-info">
              <div class="has-text-centered mb-5">
                <h1 class="title is-3 has-text-light">{{ ticket.eventName }}</h1>
                <p class="subtitle is-5 has-text-grey-light">{{ ticket.eventDate }}</p>
              </div>

              <div class="columns">
                <div class="column">
                  <div class="box has-background-grey-darker">
                    <p class="heading has-text-grey-light">Orden</p>
                    <p class="title is-4 has-text-warning">{{ ticket.orderId }}</p>
                  </div>
                </div>
                <div class="column">
                  <div class="box has-background-grey-darker">
                    <p class="heading has-text-grey-light">Estado</p>
                    <p class="title is-4 has-text-success">{{ ticket.status }}</p>
                  </div>
                </div>
              </div>

              <div class="box has-background-grey-darker">
                <p class="has-text-weight-bold has-text-light mb-3">Asientos ({{ ticket.seats.length }})</p>
                <div class="tags">
                  <span v-for="seat in ticket.seats" :key="seat" class="tag is-warning is-large mr-2">
                    {{ seat }}
                  </span>
                </div>
              </div>

              <div class="content has-text-grey-light">
                <p><strong class="has-text-light">Titular:</strong> {{ ticket.holderName }}</p>
                <p><strong class="has-text-light">Email:</strong> {{ ticket.holderEmail }}</p>
                <p><strong class="has-text-light">Entrada:</strong> {{ ticket.entrance }}</p>
                <p><strong class="has-text-light">Fecha de compra:</strong> {{ ticket.purchaseDate }}</p>
              </div>

              <div class="notification is-info is-light mt-4">
                <p class="has-text-weight-bold mb-2">📋 Instrucciones de Acceso:</p>
                <ul class="mt-2">
                  <li>Presenta este QR en la entrada</li>
                  <li>Lleva tu documento de identidad</li>
                  <li>Llega 30 minutos antes del evento</li>
                  <li>Las puertas abren a las 19:00 hrs</li>
                </ul>
              </div>

              <div class="has-text-centered mt-5">
                <button class="button is-warning" @click="printTicket">
                  <span>🖨️ Imprimir Ticket</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Ticket Inválido -->
          <div v-else class="box has-text-centered">
            <div class="notification is-danger is-light">
              <p class="title is-4">✗ Ticket No Válido</p>
              <p class="mb-4">Este código no corresponde a ningún ticket registrado</p>
              <p class="has-text-grey">ID: {{ ticketId }}</p>
            </div>
            <div class="mt-5">
              <a href="https://carnaval-oruro.com" class="button is-link">
                Volver al sitio principal
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()
const ticketId = route.params.id

const loading = ref(true)
const ticket = ref(null)

// En producción, esta función llamará a tu API FastAPI
const fetchTicket = async (id) => {
  // Simular llamada a API
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Tickets de ejemplo para testing
  const tickets = {
    'XDL-209-783': {
      orderId: 'XDL-209-783',
      eventName: 'Carnaval de Oruro 2025',
      eventDate: 'Sábado, 25 de Febrero 2025 - 20:00 hrs',
      seats: ['C3', 'B1', 'A2'],
      status: 'Activo',
      holderName: 'Juan Pérez García',
      holderEmail: 'juan.perez@example.com',
      entrance: 'Entrada Norte - Acceso VIP',
      purchaseDate: '4 de Junio, 2025'
    },
    'XDL-123-456': {
      orderId: 'XDL-123-456',
      eventName: 'Carnaval de Oruro 2025',
      eventDate: 'Sábado, 25 de Febrero 2025 - 20:00 hrs',
      seats: ['A5', 'A6'],
      status: 'Activo',
      holderName: 'María González',
      holderEmail: 'maria.g@example.com',
      entrance: 'Entrada Sur',
      purchaseDate: '3 de Junio, 2025'
    }
  }
  
  return tickets[id] || null
  
  // En producción descomenta esto:
  /*
  try {
    const response = await fetch(`https://tu-api.com/api/tickets/${id}/validate`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Error fetching ticket:', error)
    return null
  }
  */
}

const printTicket = () => {
  window.print()
}

onMounted(async () => {
  ticket.value = await fetchTicket(ticketId)
  loading.value = false
})

// SEO y meta tags dinámicos
useHead({
  title: ticket.value 
    ? `Ticket ${ticket.value.orderId} - Carnaval Oruro` 
    : 'Validar Ticket - Carnaval Oruro',
  meta: [
    { 
      name: 'description', 
      content: ticket.value 
        ? `Ticket válido para ${ticket.value.eventName}` 
        : 'Página de validación de tickets'
    }
  ]
})
</script>

<style scoped>
/* Estilos para impresión */
@media print {
  .button {
    display: none !important;
  }
  
  .notification.is-success {
    background-color: white !important;
    border: 2px solid #48c78e !important;
  }
}
</style>