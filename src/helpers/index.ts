//Función para poner en mayúscula la primera letra del texto pasado.
export function titleCase(text: string) {
    return text.split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }