<div align="center">
  <h1>Innogyzer CMS (Backend)</h1>
  <p><strong>Panel Administrador Headless con Payload CMS y Supabase</strong></p>
</div>

---

## 🚀 Overview

Este repositorio es el **Backend (Headless CMS)** del ecosistema web de Innogyzer. Proporciona la interfaz administrativa y la API REST/GraphQL necesaria para gestionar todo el contenido dinámico de la página pública (Frontend).

Está construido con la versión más reciente de **Payload CMS v3**, ejecutándose sobre Next.js (App Router), y utiliza PostgreSQL como base de datos en la nube.

---

## 🛠️ Stack Tecnológico

- **Framework Core:** Payload CMS v3
- **Runtime:** Node.js + Next.js (App Router)
- **Base de Datos:** PostgreSQL (Alojado en Supabase)
- **Almacenamiento de Archivos (S3):** Supabase Storage (Buckets)
- **Lenguaje:** TypeScript

---

## 📂 Arquitectura de Colecciones

El panel está estructurado para gestionar las siguientes entidades principales:

1. **Testimonios (`Testimonials`):**
   - Gestión de reseñas de clientes y partners.
   - Contiene: Nombre del cliente, Puesto/Empresa, Cita (Quote) y Foto.
2. **Equipo (`Team / Users`):**
   - Gestión de roles de administrador y perfiles directivos.
3. **Blog (`Posts`):**
   - Artículos y noticias utilizando el potente editor de texto enriquecido (Lexical Editor).
4. **Media (`Media`):**
   - Repositorio centralizado de imágenes y documentos subidos, almacenados directamente en Supabase S3.

*(Nota: Las colecciones antiguas de Portfolio y Services fueron removidas para simplificar la arquitectura, ya que esos datos ahora se manejan de forma estática en el Frontend).*

---

## 💻 Desarrollo Local

### Requisitos Previos
- Node.js (v18+)
- Una cuenta de Supabase con una base de datos PostgreSQL activa y un Bucket de S3 público.

### Instalación

1. Clona este repositorio y entra a la carpeta:
```bash
git clone https://github.com/TU_USUARIO/innogyzer-cms.git
cd innogyzer-cms
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto. **(Obligatorio para que funcione)**:
```env
PAYLOAD_SECRET=cualquier-cadena-segura-y-secreta
DATABASE_URI=postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres

# Configuración de S3 (Supabase Storage)
S3_ENDPOINT=https://[PROJECT_ID].supabase.co/storage/v1/s3
S3_BUCKET=nombre-de-tu-bucket
S3_ACCESS_KEY_ID=tu-access-key
S3_SECRET_ACCESS_KEY=tu-secret-key
S3_REGION=auto
```

4. Ejecuta el servidor en modo desarrollo:
```bash
npm run dev
```

El administrador estará disponible en: **http://localhost:3000/admin**  
La API REST estará disponible en: **http://localhost:3000/api**

---

## ☁️ Despliegue en Producción (Vercel)

Este proyecto está optimizado para desplegarse fácilmente en **Vercel** o en plataformas similares que soporten Next.js.

1. Importa este repositorio en Vercel.
2. Ve a la configuración del proyecto y **agrega todas las variables de entorno** que tienes en tu archivo `.env` local.
3. Haz clic en **Deploy**.
4. ¡Listo! Vercel construirá la aplicación y te proporcionará una URL pública segura.

Recuerda actualizar tu Frontend (`innogyzer-website-light`) para que apunte a esta nueva URL pública en lugar de `localhost`.

---

<div align="center">
  <p>Construido con ❤️ por el equipo de Innogyzer.</p>
</div>
