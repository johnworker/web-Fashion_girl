var inventory=[
	{
		name:'skirt',
		options:[{
			id:1,
			details:'knitted skirt(white)',
			price:350
		},{
			id:2,
			details:'suspender skirt(black)',
			price:350
		},{
			id:3,
			details:'silk dress(white)',
			price:350
		},{
			id:4,
			details:'knitted skirt(pink)',
			price:350
		},{
			id:5,
			details:'silk dress(yellow)',
			price:350
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

   /* 頁籤相簿 */
   $( function() {
	$( "#tabs" ).tabs();
  } );
	