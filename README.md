# Bóveda Partum

Gestor de contraseñas en un solo archivo (`index.html`), sin servidor y sin dependencias.

- Contraseña maestra para entrar (PBKDF2-SHA256, 600 000 iteraciones → AES-256-GCM).
- Todo se guarda **cifrado** en el navegador (localStorage). El repo no contiene datos.
- Buscador en tiempo real (tecla `/`), filtros por cliente y "sin contraseña".
- Copiar correo/contraseña (el portapapeles se limpia a los 30 s), generador de contraseñas.
- Bloqueo automático tras 5 min de inactividad.
- Importar el inventario `.md`, exportar/importar respaldo cifrado `.json`.

## Uso
1. Abre `index.html` en Chrome, Edge, Safari o Firefox.
2. Crea tu contraseña maestra.
3. Arrastra el inventario `.md` para cargar las cuentas y ve llenando las contraseñas.
4. Exporta un respaldo cifrado de vez en cuando (menú ⋮).

> Este repositorio es público: no subas el inventario ni los respaldos (`.gitignore` ya los excluye).
> Si olvidas la contraseña maestra, los datos no se pueden recuperar.
