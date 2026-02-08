import { useContext, useState, useMemo } from "react";
import { MdOutlinePayment } from "react-icons/md";
import { CartContext } from "../../../Context/CartContext";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import { gainXpAction } from "../../../api/gainXp";
const GAME_PROMO_CODES = [
  {
    code: "HarutoWinter",
    discountPercent: 15,
    description: "Giảm 15% cho tất cả các tựa game Triple A"
  },
  {
    code: "HarutoSteam",
    discountAmount: 100000,
    description: "Giảm 100.000đ dành riêng cho fan Haruto"
  },
  {
    code: "HaruLuvSines",
    discountPercent: 50,
    description: "Giảm 50% cho đơn hàng đầu tiên (Tối đa 200k)"
  }
];

export function Checkout() {
  const { cart, removeFromCart, updateQuantity, totalQuantity, totalPrice, resetCart } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState("");
  const [sale, setSale] = useState(null);
  const [promoError, setPromoError] = useState("");
  const { setUser } = useContext(AuthContext);
  // Logic kiểm tra mã giảm giá
  const checkSales = () => {
    const inputValue = promoCode.toUpperCase().trim();
    const foundSaleCode = GAME_PROMO_CODES.find(
      (item) => item.code.toUpperCase().trim() === inputValue
    );

    if (foundSaleCode) {
      setSale(foundSaleCode);
      setPromoError("");
    } else {
      setSale(null);
      if (inputValue.length > 0) {
        setPromoError("Mã giảm giá không hợp lệ!");
      } else {
        setPromoError("");
      }
    }
  };

  // 1. Tính số tiền được giảm từ mã Promo
  const promoDiscountAmount = useMemo(() => {
    if (!sale) return 0;
    return sale.discountPercent
      ? (totalPrice * sale.discountPercent) / 100
      : (sale.discountAmount || 0);
  }, [totalPrice, sale]);

  // 2. Tính thuế (10% dựa trên giá sau khi giảm Promo)
  const taxAmount = useMemo(() => {
    return (totalPrice - promoDiscountAmount) * 0.1;
  }, [totalPrice, promoDiscountAmount]);

  // 3. Tổng cộng cuối cùng
  const grandTotal = (totalPrice - promoDiscountAmount) + taxAmount;
  const handleBuyGame = async () => {
    try {
      const updatedUser = await gainXpAction('BUY GAME');
      const finalUser = updatedUser?.user || updatedUser || updatedUser.data.user;
      console.log('Cộng thành công: ', updatedUser);
      setUser(finalUser);
    }
    catch (err) {
      console.log('Lỗi không thể cộng điểm khi mua game!', err);
    }
  }
  return (
    <div className="bg-bg-base">
      <div className="bg-bg-base min-h-screen text-white">
        <div className="mt-22 max-w-7xl mx-auto p-4 flex flex-col gap-3">
          <div className="flex gap-2 text-slate-400 text-sm">
            <Link to="/" className="select-none cursor-pointer ">Store</Link>
            <p>/</p>
            <p className="text-white">Cart</p>
          </div>
          <h1 className="text-3xl font-bold mt-2">My Shopping Cart</h1>
        </div>

        {/* 2. Main Content Area */}
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-8">

          {/* Cột trái: Danh sách sản phẩm */}
          <div className="basis-2/3 flex flex-col gap-4">
            {cart?.length > 0 ? (
              cart.map((item) => {
                const basePrice = Number(item?.pricing?.base_price || 0);
                const discountPercent = Number(item?.pricing?.discount_percent || 0);
                const currency = item?.pricing?.currency || "VND";
                const isFree = item?.pricing?.free_to_play;
                // Tính giá sau giảm của từng item (Sale của game)
                const productAfterDiscount = isFree ? 0 : (basePrice * (1 - discountPercent / 100));

                return (
                  <div key={item?._id} className="group relative bg-slate-900 rounded-xl p-4 shadow-sm border border-slate-800 flex flex-col sm:flex-row gap-4 transition-all hover:border-green-500/50">
                    {/* Hình ảnh */}
                    <div className="sm:w-32 sm:h-24 w-full h-48 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                      <img
                        alt={item?.game_title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={item?.media?.thumbnail}
                      />
                    </div>

                    {/* Thông tin game */}
                    <div className="grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-500 transition-colors">
                            {item?.game_title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-gray-500 hover:text-red-500 transition-colors p-1"
                          >
                            <span className="material-icons-round cursor-pointer">Delete</span>
                          </button>
                        </div>
                        <div className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                          <span className="bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-700">
                            {item?.sub_name || "Digital Key"}
                          </span>
                          <span>{item?.platforms?.[0]}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">Số lượng: </span>
                          <input
                            type="number"
                            className="bg-slate-800 text-white w-12 text-center rounded border border-slate-700"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item?._id, parseInt(e.target.value) || 1)}
                          />
                        </div>

                        <div className="text-right">
                          {isFree ? (
                            <p className="text-xl font-bold text-green-400">FREE</p>
                          ) : (
                            <>
                              {discountPercent > 0 && (
                                <p className="text-gray-500 line-through text-xs">
                                  {basePrice.toLocaleString('vi-VN')} {currency}
                                </p>
                              )}
                              <p className="text-xl font-bold text-green-500">
                                {productAfterDiscount.toLocaleString('vi-VN')} {currency}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 text-center">
                <p className="text-slate-400 text-lg">Giỏ hàng của bạn đang trống.</p>
              </div>
            )}
          </div>

          {/* Cột phải: Games Summary */}
          <div
            className={`
          ${cart.length === 0 ? "opacity-40 pointer-events-none grayscale select-none" : "opacity-100"}
          basis-1/3`}>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Games Summary</h2>

              <div className="flex justify-between mb-4">
                <span className="text-slate-400 font-medium">Subtotal ({totalQuantity} items)</span>
                <span className="font-semibold">{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
              </div>

              {sale && (
                <div className="flex justify-between mb-4 text-red-400 animate-pulse">
                  <span className="text-slate-400 font-medium">Promo Discount ({sale.code})</span>
                  <span className="font-semibold">-{promoDiscountAmount.toLocaleString('vi-VN')} VNĐ</span>
                </div>
              )}

              <div className="flex justify-between mb-4">
                <span className="text-slate-400 font-medium">Tax (10%)</span>
                <span className="font-semibold">{taxAmount.toLocaleString('vi-VN')} VNĐ</span>
              </div>

              <hr className="border-slate-800 mb-6" />

              <div className="flex justify-between text-2xl font-bold mb-8">
                <span>Total</span>
                <span className="text-green-500">{grandTotal.toLocaleString('vi-VN')} VNĐ</span>
              </div>

              <button
                onClick={() => {
                  resetCart();
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all flex gap-3 items-center justify-center shadow-lg shadow-green-500/20 active:scale-95">
                <MdOutlinePayment className="text-2xl" />
                <span
                  onClick={()=> handleBuyGame()}
                  className="text-lg uppercase tracking-wider cursor-pointer">Checkout Now</span>
              </button>

              <div className="relative mb-6 mt-8">
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg py-3 pl-4 pr-24 focus:border-green-500 outline-none text-sm placeholder-slate-600 transition-all"
                  placeholder="Nhập mã khuyến mãi..."
                  type="text"
                />
                <button
                  onClick={checkSales}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-slate-800 hover:bg-slate-700 text-green-500 rounded-md text-xs font-bold transition-colors"
                >
                  APPLY
                </button>
              </div>
              {promoError && <p className="text-red-500 text-xs mb-4 italic px-1">{promoError}</p>}
              {sale && <p className="text-green-500 text-xs mb-4 italic px-1">✓ {sale.description}</p>}

              <div className="bg-blue-900/10 rounded-xl p-4 flex gap-4 items-center border border-blue-900/30">
                <IoMdInformationCircleOutline className="text-3xl text-blue-500 shrink-0" />
                <p className="text-[11px] text-blue-200 leading-relaxed">
                  Bằng cách hoàn tất thanh toán, bạn đồng ý với Điều khoản dịch vụ.
                  Mã kích hoạt game sẽ được gửi tự động tới Email đăng ký của bạn ngay lập tức.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}