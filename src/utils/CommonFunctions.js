export const checkInWishlist = (productId,setExistInWishlist) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    wishlist &&
      wishlist.map((w, i) => {
        if (w?.Id?.toString() === productId) {
          console.error(w);
          setExistInWishlist(true);
        }
      });
  };