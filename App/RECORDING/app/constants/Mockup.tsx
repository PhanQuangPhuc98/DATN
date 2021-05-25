import images from '../assets/imagesAsset'

const DataImage = [
    {
        ID: 1,
        img: images.img_Recoding
    },
    {
        ID: 2,
        img: images.img_RecodingA
    },
    {
        ID: 3,
        img: images.img_RecodingB
    }
];
const DataImageProduct = [
    {
        ID: 1,
        img: images.img_Equalizer,
        name: "Tai nghe kiêm âm",
        price: "2.550.000"
    },
    {
        ID: 2,
        img: images.img_HeadPhone,
        name: "Mixer bàn tròn âm thanh elm smr801",
        price: "2.550.000"
    },
    {
        ID: 3,
        img: images.img_Mixer,
        name: "Uad duo twin usb",
        price: "2.550.000"
    },
    {
        ID: 4,
        img: images.img_Mixer,
        name: "Uad duo twin usb",
        price: "2.550.000"
    },

];
const DataPromotion = [
    {
        ID: 1,
        img: images.img_Turbor,
        name: "Turbor 8",
        content: "Loa kiểm âm Monkey-Banana Turbo 8 màu vàng được ví như là một đôi tai tuyệt vời mà bất kì ai trong chúng ta cũng ao ước được sở hữu.",
        Date: "01/03/2020"
    },
    {
        ID: 2,
        img: images.img_Audio,
        name: "Audio-Technica At2020",
        content: "BÙNG NỔ SIÊU KHUYẾN MẠI CỰC LỚN CHO THÁNG 7 ️",
        Date: "01/03/2020"
    },
    {
        ID: 3,
        img: images.img_Cap_Ugreen,
        name: "Cap ugreeen",
        content: "Cáp micro Ugreen là day cáp chính hãng, jack micro hàng đầu thế giới",
        Date: "01/03/2020"
    },
    {
        ID: 4,
        img: images.img_Wepcam,
        name: "Logitech webcam",
        content: "Thực hiện cuộc gọi vcity_ideo có độ phân giải cao trên các nền tảng ưa thích của bạn như Skype™. Ở tốc độ 30 khung hình/giây, chất lượng vcity_ideo trở nên mượt mà, trong khi hình ảnh rõ ràng, đầy màu sắc và có độ tương phản.",
        Date: "01/03/2020"
    }
];
const DataCity = [
    {
        name: "Hà Nội",
        city_id: 0
    },
    {
        name: "TP Hồ Chí Minh",
        city_id: 1
    },
    {
        name: "An Giang",
        city_id: 2
    },
    {
        name: "Bắc Giang",
        city_id: 3
    },
    {
        name: "Bắc Kạn",
        city_id: 4
    },
    {
        name: "Bạc Liêu",
        city_id: 5
    },
    {
        name: "Bắc Ninh",
        city_id: 6
    },
    {
        name: "Bến Tre",
        city_id: 7
    },
    {
        name: "Bình Định",
        city_id: 8
    },
    {
        name: "Bình Phước",
        city_id: 9
    },
    {
        name: "Bình Thuận",
        city_id: 10
    },
    {
        name: "Cà Mau",
        city_id: 11
    },
    {
        name: "Cần Thơ",
        city_id: 12
    },
    {
        name: "Cao Bằng",
        city_id: 13
    },
];
const DataSearch = [
    {
        ID_Search: "0",
        img: images.img_Gen3,
        name: "Focusrite scarlett 2i2 gen3",
        price: "3.000.000"
    },
    {
        ID_Search: "1",
        img: images.img_Icon_Upod,
        name: "Upod nano sound card 5",
        price: "3.000.000"
    },
    {
        ID_Search: "2",
        img: images.img_Wepcam,
        name: "Logitech webcam",
        price: "3.000.000"
    },
    {
        ID_Search: "3",
        img: images.img_M_track,
        name: "M Audio M Track",
        price: "3.000.000"
    },
    {
        ID_Search: "4",
        img: images.img_Mackie,
        name: "Mackie cr3",
        price: "3.000.000"
    },
    {
        ID_Search: "5",
        img: images.img_Headphone_akg,
        name: "Headphone akg 240",
        price: "3.000.000"
    },
    {
        ID_Search: "6",
        img: images.img_Headphone_akg,
        name: "Headphone akg 240",
        price: "3.000.000"
    },
    {
        ID_Search: "7",
        img: images.img_Headphone_akg,
        name: "Headphone akg 240",
        price: "3.000.000"
    },
    {
        ID_Search: "8",
        img: images.img_Headphone_akg,
        name: "Headphone akg 240",
        price: "3.000.000"
    },
    {
        ID_Search: "9",
        img: images.img_Headphone_akg,
        name: "Headphone akg 240",
        price: "3.000.000"
    },
    {
        ID_Search: "10",
        img: images.img_Wepcam,
        name: "Logitech webcam",
        price: "3.000.000"
    },
    {
        ID_Search: "11",
        img: images.img_Wepcam,
        name: "Logitech webcam",
        price: "3.000.000"
    },
    {
        ID_Search: "12",
        img: images.img_Wepcam,
        name: "Logitech webcam",
        price: "3.000.000"
    },
    {
        ID_Search: "13",
        img: images.img_M_track,
        name: "M Audio M Track",
        price: "3.000.000"
    },

];
const DataUser = {
    name: 'Phan Quang Phúc',
    phone: '0364177852',
};
const DataMoney = {
    real: "600.000",
    sale: "300.000"
}
const Introduct = [
    {
        id:'0',
        content: 'Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất,Mstudio5A - 13 ngõ 204 Trần Duy Hưng ưu đãi đặc biệt giảm giá 50% chỉ còn 300.000đ/1bài. Với những thiết bị hiện đại nhất từ US & EU cùng với đội ngũ kỹ thuật viên nhiệt tình, chuyên môn cao, chúng tôi cam kết mang lại cho khách hàng những sản phẩm chất lượng chuyên nghiệp nhất'
    }
]
export {
    DataImage,
    DataImageProduct,
    DataPromotion,
    DataCity,
    DataSearch,
    DataUser,
    DataMoney,
    Introduct
};
