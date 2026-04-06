import { getPayload } from 'payload'
import config from './payload.config'

const reviews = [
  {
    reviewer_name: 'Valeria Vargas',
    reviewer_role: 'Cliente',
    review_text:
      'Excelente! La experiencia con sus servicios ha sido realmente sobresaliente. Desde el primer contacto hasta el resultado final, cada paso ha superado nuestras expectativas. La atención al cliente es de primer nivel, siempre atentos y dispuestos a ayudar con cualquier necesidad. La calidad y el cuidado en los detalles son evidentes, lo que refleja un profundo compromiso con la satisfacción del cliente. Sin duda, una experiencia que recomendaría a cualquiera que busque un servicio confiable y de alta calidad. ¡Gracias por el excelente trabajo!',
    position: 0,
  },
  {
    reviewer_name: 'Hannia Ugalde Angulo',
    reviewer_role: 'Cliente',
    review_text:
      'Excelentes tiempos de respuesta, precios accesibles y la atención/consultoría brindada siempre es de la mejor calidad. En momentos de mucha presión en un area desconocida para mí, agradezco la asesoría que me brindan y la paciencia para aclarar cualquier duda que pueda tener.',
    position: 1,
  },
  {
    reviewer_name: 'Esteban Contreras Chavarría',
    reviewer_role: 'Cliente',
    review_text:
      'Quiero agradecer a Carlos Mena no solo por su profesionalidad y conocimiento, sobresalientes ambos, sino también por la calidez humana que mostró durante un proceso particularmente doloroso para toda la familia. Un excelente profesional pero aun mejor persona, gracias por todo Carlos.',
    position: 2,
  },
  {
    reviewer_name: 'Natalia Segura Jiménez',
    reviewer_role: 'Cliente',
    review_text:
      'Bastante agradecida por todo el conocimiento aportado y la forma tan bonita y clara de transmitir la información en las consultas realizadas. Además me gustan las ganas legítimas de ayudar a resolver y no sólo buscar el beneficio propio.',
    position: 3,
  },
  {
    reviewer_name: 'Verónica Quirós Flores',
    reviewer_role: 'Cliente',
    review_text:
      'Muy profesional, me sentí 100% segura y acompañada, fue transparente en todo momento y paciente a la hora de sus explicaciones, se nota el amor por lo que hace.',
    position: 4,
  },
  {
    reviewer_name: 'Prose on Pixels',
    reviewer_role: 'Empresa',
    review_text:
      'Nuestra experiencia con el equipo legal ha sido altamente satisfactoria. Consideramos que existe una verdadera alianza estratégica, donde podemos recurrir al equipo ante cualquier situación específica y siempre recibimos respuestas oportunas y fundamentadas en un conocimiento experto. Su enfoque proactivo y compromiso con la resolución efectiva de nuestros desafíos legales nos ha brindado un gran valor.',
    position: 5,
  },
  {
    reviewer_name: 'Studio Saxe',
    reviewer_role: 'Empresa',
    review_text:
      'Nuestra experiencia con su equipo legal ha sido excelente. El equipo ha sido muy profesional, eficiente y siempre dispuesto a ofrecer el apoyo necesario. Su atención al detalle y la claridad en la comunicación nos han dado mucha confianza. Sin duda, valoramos la dedicación y el compromiso que han demostrado en todo momento.',
    position: 6,
  },
  {
    reviewer_name: 'Matadero del Valle',
    reviewer_role: 'Empresa',
    review_text:
      'Fusión Legal, es un equipo legal que en el tiempo que hemos laborado con ellos son muy eficientes y muy rápidos en su actuar. Destacamos la atención personalizada, constante comunicación, excelente orden de las solicitudes.',
    position: 7,
  },
  {
    reviewer_name: 'Tenería Pirro Antonio Gómez',
    reviewer_role: 'Empresa',
    review_text: 'Excelentes profesionales, destacamos su eficiencia y eficacia.',
    position: 8,
  },
]

const services = [
  {
    title: 'Estoy iniciando un negocio o empresa',
    icon_class: 'ph-rocket-launch',
    link_target: '#negocio-nuevo',
    position: 0,
    is_wide: false,
  },
  {
    title: 'Ya tengo una empresa funcionando',
    icon_class: 'ph-buildings',
    link_target: '#empresa-funcionando',
    position: 1,
    is_wide: false,
  },
  {
    title: 'Soy una persona con una consulta legal',
    icon_class: 'ph-user',
    link_target: '#consulta-personal',
    position: 2,
    is_wide: true,
  },
]

const tags = [
  { name: 'Derecho Corporativo' },
  { name: 'Derecho Laboral' },
  { name: 'Derecho Penal' },
  { name: 'Derecho Civil' },
  { name: 'Derecho Tributario' },
  { name: 'Propiedad Intelectual' },
  { name: 'Compliance' },
  { name: 'Litigio' },
  { name: 'Familia' },
  { name: 'Tecnología Legal' },
  { name: 'Emprendimiento' },
  { name: 'Contratos' },
]

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding reviews...')
  for (const review of reviews) {
    await payload.create({
      collection: 'reviews',
      data: review,
    })
  }
  console.log(`✓ ${reviews.length} reviews created`)

  console.log('Seeding services...')
  for (const service of services) {
    await payload.create({
      collection: 'services',
      data: service,
    })
  }
  console.log(`✓ ${services.length} services created`)

  console.log('Seeding tags...')
  for (const tag of tags) {
    await payload.create({
      collection: 'tags',
      data: tag,
    })
  }
  console.log(`✓ ${tags.length} tags created`)

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
