function UpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function changeColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

const pokemonTypes = [
  { type: "Grass", color: "#78C850" },
  { type: "Poison", color: "#A040A0" },
  { type: "Fire", color: "#F08030" },
  { type: "Flying", color: "#A890F0" },
  { type: "Water", color: "#6890F0" },
  { type: "Bug", color: "#A8B820" },
  { type: "Normal", color: "#A8A878" },
  { type: "Electric", color: "#F8D030" },
  { type: "Ground", color: "#E0C068" },
  { type: "Fairy", color: "#EE99AC" },
  { type: "Fighting", color: "#C03028" },
  { type: "Psychic", color: "#F85888" },
  { type: "Rock", color: "#B8A038" },
  { type: "Ice", color: "#98D8D8" },
  { type: "Dragon", color: "#7038F8" },
  { type: "Ghost", color: "#705898" },
  { type: "Steel", color: "#B8B8D0" },
];

// Shopping
document.addEventListener("DOMContentLoaded", function () {
  const Shopping = document.getElementById("Shopping-Card");
  let cart = [];
  const apiUrl = `http://localhost:3000/emojis`;
  const itemsPerPage = 20;
  let currentPage = 1;
  let totalItems = [];

  // Tạo Thẻ
  function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("Setup-Card");

    // Name
    const span = document.createElement("span");
    span.classList.add("Name");
    span.textContent = UpperCase(item.name);
    span.style.color = changeColor();

    // Type
    const pType = document.createElement("p");
    pType.classList.add("intro");
    const typeData = pokemonTypes.find((t) =>
      item.type.some((type) => t.type === type)
    );
    pType.style.color = typeData.color;
    pType.textContent = `Hệ: ${item.type.join(", ")}`;

    // Money
    const value = document.createElement("p");
    value.classList.add("money");
    value.textContent = `${item.value}$`;

    // Info
    const intro = document.createElement("p");
    intro.classList.add("intro");
    intro.textContent = `Info: ${item.introduction}`;

    // Image
    const newImg = document.createElement("img");
    newImg.classList.add("img-Card");
    newImg.src = item.src;

    // Thêm sự kiện click cho Pokémon
    card.addEventListener("click", () => openModal(item));

    // Thêm các phần tử vào card
    card.append(newImg, span, pType, intro, value);

    return card;
  }

  // tạo trang
  function displayItems(page) {
    Shopping.innerHTML = "";
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = totalItems.slice(startIndex, endIndex);

    itemsToShow.forEach((item) => {
      const card = createCard(item);
      Shopping.appendChild(card);
    });

    document.getElementById("pageNumber").textContent = `Page ${page}`;
  }

  // Tạo modal
  function openModal(item) {
    const modal = document.getElementById("modal-shop");
    const modalLeft = document.getElementById("modal-left");
    const modalRight = document.getElementById("modal-right");
    const exitButton = document.getElementById("exit");

    // Xóa nội dung cũ của modal
    modalLeft.innerHTML = "";
    modalRight.innerHTML = "";

    // Cập nhật nội dung modal bằng cách tạo card
    const modalCard = createCard(item);

    // img (left)
    const imgmodal = modalCard.querySelector("img");
    imgmodal.classList.add("img-modal");
    // Thêm các phần tử vào modalleft
    modalLeft.appendChild(imgmodal);

    // Tạo và thêm type (right)
    // name
    const spanElement = modalCard.querySelector(".Name");
    spanElement.classList.add("name-modal");
    // type
    const typeModal = document.createElement("p");
    typeModal.classList.add("intro-modal");
    const typeData = pokemonTypes.find((t) =>
      item.type.some((type) => t.type === type)
    );
    typeModal.style.color = typeData.color;
    typeModal.textContent = `Type: ${item.type.join(", ")}`;

    //  value
    const valueModal = document.createElement("p");
    valueModal.classList.add("money-modal");
    valueModal.textContent = `Value: ${item.value}$`;

    // introduction
    const introModal = document.createElement("p");
    introModal.classList.add("intro-modal");
    introModal.textContent = `Info: ${item.introduction}`;

    // quantity
    const quantityModal = document.createElement("p");
    quantityModal.classList.add("money-modal");
    quantityModal.textContent = `Số lượng: ${item.quantity || 0}`;

    // Thêm nút "Hủy" và "Thêm Vào Giỏ Hàng"
    const div = document.createElement("div");
    div.classList.add("modal-footer-right");
    const exitModal = document.createElement("span");
    exitModal.classList.add("exit");
    exitModal.textContent = "Hủy";
    const buyModal = document.createElement("span");
    buyModal.classList.add("Buy");
    buyModal.textContent = "Thêm Vào Giỏ Hàng";

    // Số lượng mua
    const divCount = document.createElement("div");
    divCount.classList.add("divCount");
    let Count = 1;
    const minus = document.createElement("span");
    minus.classList.add("list-count");
    minus.textContent = "-";
    const QuantityCount = document.createElement("span");
    QuantityCount.textContent = `${Count}`;
    const plus = document.createElement("span");
    plus.classList.add("list-count");
    plus.textContent = "+";
    divCount.append(minus, QuantityCount, plus);

    // Hàm cập nhật trạng thái của nút
    function updateButtonStates() {
      // update trừ
      if (Count <= 1) {
        minus.classList.add("disabled");
        minus.style.pointerEvents = "none";
      } else {
        minus.classList.remove("disabled");
        minus.style.pointerEvents = "auto";
      }
      // update Cộng
      if (Count >= item.quantity) {
        plus.classList.add("disabled");
        plus.style.pointerEvents = "none";
      } else {
        plus.classList.remove("disabled");
        plus.style.pointerEvents = "auto";
      }
    }
    // Cộng
    plus.addEventListener("click", () => {
      if (Count < item.quantity) {
        Count++;
        QuantityCount.textContent = `${Count}`;
        updateButtonStates();
      }
    });
    // Trừ
    minus.addEventListener("click", () => {
      if (Count > 1) {
        Count--;
        QuantityCount.textContent = `${Count}`;
        updateButtonStates();
      }
    });
    updateButtonStates();

    // Thêm sản phẩm vào giỏ hàng
    buyModal.addEventListener("click", () => {
      addToCart(item, Count);
      modal.style.display = "none";
    });

    // Thêm các phần tử thông tin vào modalRight
    div.append(exitModal, buyModal);
    modalRight.append(
      spanElement,
      typeModal,
      valueModal,
      introModal,
      quantityModal,
      divCount,
      div
    );

    // Hiển thị modal
    modal.style.display = "flex";

    // Gắn sự kiện đóng modal
    exitModal.onclick = () => {
      modal.style.display = "none";
    };
  }

  // Hàm thêm sản phẩm vào giỏ hàng
  function addToCart(item, quantity) {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...item, quantity });
    }

    // Cập nhật giỏ hàng (tất cả các sản phẩm đã thêm)
    CartShop();
    buyItem(item);
    buyAll();
  }

  // Hàm xử lý khi nhấn nút "Buy" (mua từng sản phẩm)
  function buyItem(item) {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      const order = {
        name: item.name,
        quantity: existingItem.quantity,
        value: item.value,
      };
      updateOrderDetails([order]);
      updateTotal([order]);
    } else {
      alert("Sản phẩm này chưa được thêm vào giỏ hàng.");
    }
  }

  // Hàm xử lý khi nhấn nút "Buy All" (mua tất cả sản phẩm)
  function buyAll() {
    updateOrderDetails(cart);
    updateTotal(cart);
  }

  // Hàm cập nhật thông tin đơn hàng vào input ẩn
  function updateOrderDetails(items) {
    const orderDetailsInput = document.getElementById("orderDetails");
    const orderString = items
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - Tổng: $${
            item.value * item.quantity
          }`
      )
      .join("\n"); // Ký tự xuống dòng để tách thông tin các đơn hàng

    // Đưa tất cả thông tin vào cùng một ô
    orderDetailsInput.value = orderString;
  }

  // Hàm cập nhật tổng tiền
  function updateTotal(items) {
    const total = document.getElementById("total");
    let totalCurrent = 0;

    items.forEach((item) => {
      totalCurrent += item.value * item.quantity;
    });

    // Cập nhật tổng tiền vào ô input
    total.value = `$${totalCurrent}`;
  }

  function removeCart(item) {
    // tạo mảng mới và không chứa cái đã xóa
    cart = cart.filter((cartItem) => cartItem.name !== item.name);
    CartShop();
  }

  // Order Shop
  function CartShop() {
    const Cart = document.getElementById("CartShopSection");
    Cart.innerHTML = ""; // Xóa nội dung cũ
    if (cart.length === -1) {
      const p = document.createElement("p");
      p.classList.add("p");
      p.textContent = "Giỏ hàng của bạn đang trống.";
      Cart.appendChild(p);
      return;
    }

    const CartName = document.querySelector(".Cart--order--Name");
    const CartQty = document.querySelector(".Cart--order--Qty");
    const CartMoney = document.querySelector(".Cart--order--money");
    const CartTotal = document.querySelector(".Cart--order--total");
    CartName.innerHTML = "";
    CartQty.innerHTML = "";
    CartMoney.innerHTML = "";

    cart.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("Cart-setup");

      const CartRight = document.createElement("div");
      CartRight.classList.add("CartRight");
      const CartLeft = document.createElement("div");
      CartLeft.classList.add("CartLeft");

      const img = document.createElement("img");
      img.src = item.src;

      const name = document.createElement("span");
      name.classList.add("name-Cart");
      name.textContent = item.name;

      const quantity = document.createElement("p");
      quantity.classList.add("Qty");
      quantity.textContent = `Số lượng: ${item.quantity}`;

      const total = document.createElement("p");
      total.classList.add("Cart-total");
      total.textContent = `Tổng giá: ${item.value * item.quantity}$`;

      const Buy = document.createElement("p");
      Buy.classList.add("opc");
      Buy.classList.add("BuyOrder");
      Buy.textContent = "Buy";

      const closeCart = document.createElement("p");
      closeCart.classList.add("closeCart");
      closeCart.classList.add("ti-close");

      // remove Cart
      closeCart.addEventListener("click", () => {
        removeCart(item);
      });

      // Hiện thị trang đặt hàng
      CartRight.append(name, quantity, total, Buy);
      CartLeft.append(closeCart, img);
      div.append(CartLeft, CartRight);
      Cart.appendChild(div);

      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");
      const p4 = document.createElement("p");

      const namebuy = name.textContent;
      p1.textContent = namebuy;
      CartName.appendChild(p1);

      p2.textContent = item.quantity;
      CartQty.appendChild(p2);

      p3.textContent = `${item.value * item.quantity}$`;
      CartMoney.appendChild(p3);

      let currtenttotal = 0;
      cart.forEach((item) => {
        const itemTotal = item.value * item.quantity;
        currtenttotal += itemTotal;
      });
      CartTotal.innerHTML = "";
      p4.textContent = `${currtenttotal}$ `;
      CartTotal.appendChild(p4);

      const close = document.querySelector(".close-modal");
      const modalOrder = document.getElementById("modal-Order");
      close.addEventListener("click", () => {
        modalOrder.style.display = "none";
      });
      const Buyall = document.querySelectorAll(".BuyOrder");
      Buyall.forEach((item) => {
        item.addEventListener("click", () => {
          modalOrder.style.display = "flex";
        });
      });
    });
  }

  // Search Pokemon
  function createPokemonCards(selectedType, selectMoney) {
    Shopping.innerHTML = "";
    const filteredPokemons = totalItems.filter((item) => {
      const typesMatch =
        selectedType === "All" || item.type.includes(selectedType);
      let priceCondition = true;

      // Kiểm tra giá
      switch (selectMoney) {
        case "under10":
          priceCondition = item.value < 10;
          break;
        case "under50":
          priceCondition = item.value < 50;
          break;
        case "under100":
          priceCondition = item.value < 100;
          break;
        case "under200":
          priceCondition = item.value < 200;
          break;
        case "over200":
          priceCondition = item.value > 200;
          break;
        default:
          priceCondition = true;
          break;
      }

      // Kết hợp điều kiện loại và giá
      return typesMatch && priceCondition;
    });

    filteredPokemons.forEach((pokemon) => {
      const card = createCard(pokemon);
      Shopping.appendChild(card);
    });

    if (filteredPokemons.length === 0) {
      const noResultMessage = document.createElement("p");
      noResultMessage.textContent =
        "Không tìm thấy Pokémon nào cho loại và giá đã chọn.";
      Shopping.appendChild(noResultMessage);
    }
  }
  // Search Pokemon
  document.getElementById("filter-button").addEventListener("click", () => {
    // Type
    const selectedType = document.getElementById("type").value;
    const selectMoney = document.getElementById("price").value;
    createPokemonCards(selectedType, selectMoney);
  });

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      totalItems = data;
      displayItems(currentPage);
    })
    .catch((error) => {
      console.log("Lỗi API Pokémon!", error);
    });

  // Hiệu ứng + - số lượng pokemon
  document.getElementById("prevBtn").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayItems(currentPage);
    }
  });

  document.getElementById("nextBtn").addEventListener("click", function () {
    if (currentPage * itemsPerPage < totalItems.length) {
      currentPage++;
      displayItems(currentPage);
    }
  });
});
let activeSection = document.querySelector(".active");
// ChangPage
document.addEventListener("DOMContentLoaded", function () {
  // Đổi trang
  const changePage = document.querySelectorAll(".menu-header");

  changePage.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      if (activeSection) {
        activeSection.classList.remove("active");
        activeSection.style.display = "none";
      }
      const targetId = menuItem.id + "Section";
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
        targetSection.style.display = "block";
        activeSection = targetSection;
      }
    });
  });

  // Trang Order
  const Click = document.querySelectorAll(".Click");
  let CartActive = document.querySelector(".activeShop");
  Click.forEach((item) => {
    item.addEventListener("click", () => {
      if (CartActive) {
        CartActive.classList.remove("activeShop");
        document.querySelector(".bgCl")?.classList.remove("bgCl");
      }
      const targetIdOrder = item.id + "Section";
      const targetSectionOrder = document.getElementById(targetIdOrder);
      if (targetSectionOrder) {
        targetSectionOrder.classList.add("activeShop");
        item.classList.add("bgCl");
        CartActive = targetSectionOrder;
      }
    });
  });
  const paragraph = document.querySelectorAll("#modal-order-right p");
  let activeOrder = document.querySelector("p.activeorder");
  paragraph.forEach((e) => {
    e.addEventListener("click", function () {
      if (activeOrder) {
        activeOrder.classList.remove("activeorder");
      }
      e.classList.toggle("activeorder");
      activeOrder = e.classList.contains("activeorder") ? e : null;
    });
  });
  const Login = document.querySelector("#Login--Account");
  const Signup = document.querySelector("#Create--Account");
  const LoginSection = document.querySelector("#LoginSection");
  const SignUpSection = document.querySelector("#SignUpSection");
  Login.addEventListener("click", () => {
    SignUpSection.style.display = "none";
    SignUpSection.classList.remove("active");
    LoginSection.classList.add("active");
    activeSection = LoginSection;
  });
  Signup.addEventListener("click", () => {
    LoginSection.style.display = "none";
    LoginSection.classList.remove("active");
    SignUpSection.classList.add("active");
    activeSection = SignUpSection;
  });

  const openMenu = document.querySelector(".menu");
  openMenu.addEventListener("click", () => {
    document.querySelector(".menu--mobile").classList.toggle("active");
  });
  changePage.forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".menu--mobile").classList.remove("active");
    });
  });
});

function fetchInfo() {
  const phoneInputs = document.querySelectorAll(".phone-search");
  let phoneNumbers = [];

  // Collecting phone numbers from input fields
  for (let i = 0; i < phoneInputs.length; i++) {
    const phoneValue = phoneInputs[i].value.trim();
    if (phoneValue) {
      phoneNumbers.push(phoneValue);
    }
  }

  phoneNumbers.forEach((phone) => {
    const url =
      "https://script.google.com/macros/s/AKfycbzDLbANoIX9PP5Kbd82GmSp95snfQnp0JzUadabNOm2amrDP-IlvHSOIG1ReGKs_xRd9g/exec?Phone=" +
      encodeURIComponent(phone);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.text();
      })
      .then((text) => {
        if (text.trim()) {
          const data = JSON.parse(text);
          if (data.Name) {
            document.getElementById("name").value = data.Name;
            document.getElementById("email").value = data.Email;
            document.getElementById("phone").value = phone;
            document.getElementById("address").value = data.Address;
          } else {
            alert("Không tìm thấy thông tin cho số điện thoại này: " + phone);
          }
        } else {
          throw new Error("Response is empty");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
      });
  });
}

function fetchOrderDetails() {
  const phone = document.querySelector(".tracuu").value;

  if (phone) {
    const orderUrl = `https://script.google.com/macros/s/AKfycbzDLbANoIX9PP5Kbd82GmSp95snfQnp0JzUadabNOm2amrDP-IlvHSOIG1ReGKs_xRd9g/exec?Phone=${encodeURIComponent(
      phone
    )}&request=order`;

    console.log(orderUrl);

    fetch(orderUrl)
      .then((response) => response.json())
      .then((data) => {
        const valueInfo = document.getElementById("ValueInfo");
        valueInfo.innerHTML = "";

        if (Array.isArray(data) && data.length > 0) {
          data.forEach((item) => {
            const p1 = document.createElement("p");
            const p2 = document.createElement("p");
            p1.textContent = `Order Details: ${item.OrderDetails}`;
            p2.textContent = `Total: ${item.Total}`;
            valueInfo.append(p1, p2);
          });
        } else if (data.error) {
          alert(data.error);
        } else {
          alert("Không tìm thấy thông tin cho số điện thoại này: " + phone);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Có lỗi xảy ra khi lấy thông tin đơn hàng. Vui lòng thử lại.");
      });
  }
}

document.querySelectorAll(".phone-search").forEach((input) => {
  input.addEventListener("blur", fetchInfo);
});

document.getElementById("Accept").addEventListener("click", fetchOrderDetails);
const ValueInfo = document.querySelector("#ValueInfo");
const inputMyorder = document.querySelectorAll("#MyOrderSection input");
const Accept = document.querySelector("#Accept");
const ValueSearch = document.getElementById("ValueSearch");

Accept.addEventListener("click", () => {
  ValueSearch.style.opacity = "1";
  ValueInfo.style.display = "flex";
  inputMyorder.forEach((e) => {
    e.style.display = "none";
  });
  document.querySelector(".CheckValue").style.display = "none";
});
document.addEventListener("DOMContentLoaded", () => {
  const eye = document.querySelector(".ti-eye");
  const Passwordshow = document.querySelector("input#Password_login");
  eye.addEventListener("click", () => {
    if (Passwordshow.type === "Password") {
      Passwordshow.type = "text";
    } else {
      Passwordshow.type = "Password";
    }
  });
});

// đăng nhập
function fetchCheckPass() {
  const Username = document.querySelector("#Name_login").value;
  const Password = document.querySelector("#Password_login").value;

  console.log("Username:", Username, "Password:", Password);

  // Kiểm tra xem Username và Password có hợp lệ không
  if (!Username || !Password) {
    console.error("Username or Password is missing");
    return; // Ngăn không gọi fetch nếu không có Username hoặc Password
  }

  const userUrl = `https://script.google.com/macros/s/AKfycbxWwqNuYNMB9jU78VpDytogOxEuynUbKzfactCZ_1vtMSCTgajn_kUzSv1D5HQjDxhHHQ/exec?Username=${encodeURIComponent(
    Username
  )}&Password=${encodeURIComponent(Password)}`;
  console.log("Fetch userUrl:", userUrl);

  fetch(userUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("API Response:", data);

      const Login = document.querySelector("#Login");
      const SignUp = document.querySelector("#SignUp");
      const User = document.querySelector("#User");
      const LoginSection = document.querySelector("#LoginSection");
      const HomeSection = document.querySelector("#HomeSection");
      const UserSection = document.querySelector("#UserSection");
      if (data.status === "success" && data.data) {
        document.querySelector(
          "#User--Name"
        ).textContent = `${data.data.Surname} ${data.data.Name}`;
        document.querySelector("#profileSurname").textContent =
          data.data.Surname;
        document.querySelector("#profileName").textContent = data.data.Name;
        document.querySelector("#profileGmail").textContent = data.data.Gmail;
        document.querySelector(
          "#profilePhone"
        ).textContent = `+84 ${data.data.Phone}`;
        document.querySelector("#profileAddress").textContent =
          data.data.Address;

        Login.style.display = "none";
        SignUp.style.display = "none";
        User.style.display = "block";

        LoginSection.classList.remove("active");
        LoginSection.style.display = "none";
        HomeSection.classList.add("active");
        activeSection = HomeSection;
      } else if (data.status === "error") {
        // Khi đăng nhập sai, chỉ hiển thị alert mà không chuyển hướng
        alert("Tài Khoản hoặc Mật Khẩu không đúng");
      }
      const Logout = document.querySelector(".logout");
      Logout.addEventListener("click", () => {
        User.style.display = "none";
        Login.style.display = "block";
        SignUp.style.display = "block";
        UserSection.classList.remove("active");
        UserSection.style.display = "none";
        HomeSection.classList.add("active");
        activeSection = HomeSection;
      });
    })
    .catch((error) => {
      console.error("Lỗi đăng nhập:", error);
      alert("Đã xảy ra lỗi trong quá trình đăng nhập.");
    });
}
document
  .getElementById("form_login")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    fetchCheckPass();
  });
