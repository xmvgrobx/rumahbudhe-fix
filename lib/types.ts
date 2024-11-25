export interface CartItem {
    menuId: string;      // ID menu (harus string, sesuai penggunaan dalam prisma.create)
    quantity: number;    // Jumlah barang yang dibeli
    subtotal: number;    // Harga subtotal (quantity * harga per item)
  }
  