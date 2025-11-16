/**
 * Configuración del Hero Section (Página principal)
 */
export interface ConfiguracionHero {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  textoCta: string;
  imagenHero: string;
  badge: string;
}

/**
 * Una característica del negocio (Ej: "Envío Gratis", "Garantía Total")
 */
export interface Caracteristica {
  icono: string; // emoji o nombre de icono
  titulo: string;
  descripcion: string;
}

/**
 * Estadística del negocio
 */
export interface Estadistica {
  valor: string; // Ej: "10k+", "98%", "5+"
  label: string; // Ej: "Productos", "Satisfacción", "Años"
  color: string; // Ej: "purple", "pink", "blue"
}

/**
 * Sección "Sobre Nosotros"
 */
export interface ConfiguracionAbout {
  titulo: string;
  descripcionPrincipal: string;
  descripcionSecundaria: string;
  imagenAbout: string;
  badgeTexto: string;
}

/**
 * Red social
 */
export interface RedSocial {
  nombre: string; // "Facebook", "Instagram", "Twitter", "LinkedIn", "WhatsApp"
  url: string;
  visible: boolean;
}

/**
 * Categoría del negocio personalizable
 */
export interface Categoria {
  nombre: string;
  icono: string; // emoji
  valor: string; // slug para URLs
  colorGradient: string; // Ej: "from-gray-700 to-purple-700"
}

/**
 * Configuración General de la Tienda
 * Información básica de la empresa
 */
export interface ConfiguracionGeneral {
  nombreTienda: string;
  slogan: string;
  emailContacto: string;
  telefono: string;
  whatsapp: string;
  descripcion: string;
  direccion: string;
  logoUrl: string;
  tipoNegocio: 'gaming' | 'ropa' | 'tecnologia' | 'hogar' | 'deportes' | 'otro';
  añoFundacion: string;
}

export interface ConfiguracionTienda {
  moneda: 'COP' | 'USD' | 'EUR' | 'MXN';
  simboloMoneda: string;
  iva: number; // Porcentaje 0-100
  envioGratisDesde: number; // Monto mínimo para envío gratis
  costoEnvioBase: number;
}

export interface ConfiguracionAvanzada {
  modoMantenimiento: boolean;
  mostrarProductosSinStock: boolean;
  permitirComprasSinRegistro: boolean;
  notificarStockBajo: boolean;
  stockBajoUmbral: number;
}

export interface ConfiguracionCompleta {
  general: ConfiguracionGeneral;
  tienda: ConfiguracionTienda;
  avanzada: ConfiguracionAvanzada;
  hero: ConfiguracionHero;
  caracteristicas: Caracteristica[];
  estadisticas: Estadistica[];
  about: ConfiguracionAbout;
  redesSociales: RedSocial[];
  categorias: Categoria[];
}

// Valores por defecto
export const defaultConfiguracionCompleta: ConfiguracionCompleta = {
  general: {
    nombreTienda: "TechMarket Pro",
    slogan: "Innovación al Alcance de Todos",
    emailContacto: "contacto@techmarket.com",
    telefono: "+57 321 456 7890",
    whatsapp: "+57 321 456 7890",
    descripcion: "Tu tienda especializada en tecnología de vanguardia. Ofrecemos los mejores productos gaming, periféricos y accesorios tecnológicos del mercado.",
    direccion: "Calle 123 #45-67, Bogotá, Colombia",
    logoUrl: "🛒",
    tipoNegocio: 'tecnologia',
    añoFundacion: "2020"
  },
  
  tienda: {
    moneda: 'COP',
    simboloMoneda: '$',
    iva: 19,
    envioGratisDesde: 150000,
    costoEnvioBase: 15000
  },
  
  avanzada: {
    modoMantenimiento: false,
    mostrarProductosSinStock: true,
    permitirComprasSinRegistro: true,
    notificarStockBajo: true,
    stockBajoUmbral: 5
  },
  
  hero: {
    titulo: "Descubre la Mejor Tecnología Gaming",
    subtitulo: "Potencia tu Setup con los Mejores Productos",
    descripcion: "Desde periféricos gaming hasta componentes de última generación. Todo lo que necesitas para llevar tu experiencia al siguiente nivel.",
    textoCta: "Ver Productos",
    imagenHero: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&q=80",
    badge: "⚡ Envío Gratis en Compras +$150k"
  },
  
  caracteristicas: [
    {
      icono: "✅",
      titulo: "Envío Gratis",
      descripcion: "En compras superiores a $150.000"
    },
    {
      icono: "⚡",
      titulo: "Entrega Rápida",
      descripcion: "Recibe tus productos en 24-48 horas"
    },
    {
      icono: "🔒",
      titulo: "Compra Segura",
      descripcion: "Protección total en tus transacciones"
    }
  ],
  
  estadisticas: [
    {
      valor: "10k+",
      label: "Productos",
      color: "purple"
    },
    {
      valor: "98%",
      label: "Satisfacción",
      color: "pink"
    },
    {
      valor: "5+",
      label: "Años",
      color: "blue"
    }
  ],
  
  about: {
    titulo: "Tu Tienda Gaming de Confianza",
    descripcionPrincipal: "Somos especialistas en tecnología gaming con más de 5 años de experiencia. Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad y rendimiento.",
    descripcionSecundaria: "Nuestro equipo está formado por gamers apasionados que entienden tus necesidades. Ofrecemos asesoría personalizada y soporte técnico post-venta.",
    imagenAbout: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=600&q=80",
    badgeTexto: "✨ Expertos en Gaming"
  },
  
  redesSociales: [
    {
      nombre: "Facebook",
      url: "https://facebook.com/techmarket",
      visible: true
    },
    {
      nombre: "Instagram",
      url: "https://instagram.com/techmarket",
      visible: true
    },
    {
      nombre: "Twitter",
      url: "https://twitter.com/techmarket",
      visible: true
    },
    {
      nombre: "LinkedIn",
      url: "https://linkedin.com/company/techmarket",
      visible: false
    },
    {
      nombre: "WhatsApp",
      url: "https://wa.me/573214567890",
      visible: true
    }
  ],
  
  categorias: [
    {
      nombre: "Monitores",
      icono: "🖥️",
      valor: "monitores",
      colorGradient: "from-gray-700 to-purple-700"
    },
    {
      nombre: "Teclados",
      icono: "⌨️",
      valor: "teclados",
      colorGradient: "from-purple-700 to-pink-700"
    },
    {
      nombre: "Componentes",
      icono: "💻",
      valor: "componentes",
      colorGradient: "from-pink-700 to-blue-700"
    },
    {
      nombre: "Audio",
      icono: "🎧",
      valor: "audio",
      colorGradient: "from-blue-700 to-indigo-700"
    }
  ]
};

// Exportar como CONFIGURACION_DEFAULT para compatibilidad con hook
export const CONFIGURACION_DEFAULT = defaultConfiguracionCompleta;

// Mapeo de monedas
export const MONEDAS = {
  COP: { nombre: 'Peso Colombiano', simbolo: '$' },
  USD: { nombre: 'Dólar Estadounidense', simbolo: '$' },
  EUR: { nombre: 'Euro', simbolo: '€' },
  MXN: { nombre: 'Peso Mexicano', simbolo: '$' },
} as const;
