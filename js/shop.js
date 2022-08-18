var inventory=[
	{
		name:'Usb stick',
		options:[{
			id:1,
			details:'16GB',
			price:6.95
		},{
			id:2,
			details:'32GB',
			price:12.95
		},{
			id:3,
			details:'64GB',
			price:25.95
		}]
	},{
		name:'Usb plug',
		options:[{
			id:4,
			details:'3ft cable',
			price:4.35
		}]
	},{
		name:'small phone',
		options:[{
			id:5,
			details:'nokia phone',
			price:4.35
		}]
	},{
		name:'camera',
		options:[{
			id:6,
			details:'blue camaera',
			price:76.50
		},{
			id:7,
			details:'red camaera',
			price:76.50
		},{
			id:8,
			details:'yellow camaera',
			price:76.50
		},{
			id:9,
			details:'purple camaera',
			price:76.50
		}]
	}
];
var incart=[];
Vue.filter('subtotal',function(cartItem){
	return cartItem.price*cartItem.quantity;
});
var vm = new Vue({
	el: "#app",
	data:{
		products:inventory,
		search:'',
		ascendOrDescend:1,
		accordingTo:'',
		incart:incart
	},
	methods:{
		sortit:function(name){
			this.ascendOrDescend*=-1;
			this.accordingTo=name;
		},
		addToCart:function(product,opt){
			var newCartItem={};
			newCartItem.name=product.name+' '+opt.details;
			newCartItem.price=opt.price;
			newCartItem.id=opt.id;
			var newQua=1;
			/*整個購物車都倒出來檢查*/
			for (var i in this.incart) {
				/*如果商品編號相同*/
				if(this.incart[i].id===opt.id){
					/*新的數量就要加一*/
					newQua=parseInt(this.incart[i].quantity)+1;
					/*找到重複的這個商品物件在陣列中的位置*/
					var theDoubleOneIndex=this.incart.indexOf(this.incart[i]);
					/*把這個陣列從這個位置開始刪掉一個*/
					this.incart.splice(theDoubleOneIndex,1);
				}
			}
			newCartItem.quantity=newQua;
			this.incart.push(newCartItem);
		},
		addOne:function(cartItem){
			cartItem.quantity++;
		},
		removeOne:function(cartItem){
			cartItem.quantity--;
			if(cartItem.quantity<=0){
				/*用編號找會比較麻煩，直接用物件找*/
				this.incart.splice(cartItem,1);
			}
		},
		removeElement:function(cartItem){
			/*跟上面的splice效果相同*/
			this.incart.$remove(cartItem);
		}
	},
	computed:{
		countQuantity:function(){
			var countQuantity=0;
			for (var i in this.incart) {
				countQuantity += parseInt(this.incart[i].quantity);
			}
			return countQuantity;
		},
		countTotal:function(){
			var countTotal=0;
			for (var i in this.incart) {
				countTotal += parseInt(this.incart[i].quantity*this.incart[i].price);
			}
			return countTotal;
		}
	}
});
Vue.config.devtools = true;
	