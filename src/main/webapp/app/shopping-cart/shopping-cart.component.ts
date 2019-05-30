import { Component, OnInit } from '@angular/core';
import { Movie } from 'app/shared/model/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'app/entities/movie';
import { JhiDataUtils } from 'ng-jhipster';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'jhi-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styles: []
})
export class ShoppingCartComponent implements OnInit {
    private items: Item[];
    private totalCost: number = 0;

    constructor(
        private activatedRoute: ActivatedRoute,
        private movieService: MovieService,
        protected dataUtils: JhiDataUtils,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.loadCart();
    }

    addToCart(id: number) {
        if (id) {
            this.movieService.find(id).subscribe(result => {
                var item: Item = {
                    movie: result.body,
                    quantity: 1
                };
                if (localStorage.getItem('cart') == null) {
                    // if no cart create cart in local storage
                    let cart: any = [];
                    cart.push(JSON.stringify(item));
                    localStorage.setItem('cart', JSON.stringify(cart));
                } else {
                    console.log(localStorage.getItem('cart'));
                    let cart: any = JSON.parse(localStorage.getItem('cart'));
                    let index: number = -1;
                    for (let i = 0; i < cart.length; i++) {
                        let item: Item = JSON.parse(cart[i]);
                        console.log(cart);
                        if (item.movie.id == id) {
                            index = i;
                            break;
                        }
                    }
                    if (index == -1) {
                        cart.push(JSON.stringify(item));
                        localStorage.setItem('cart', JSON.stringify(cart));
                    } else {
                        let item: Item = JSON.parse(cart[index]);
                        item.quantity += 1;
                        cart[index] = JSON.stringify(item);
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }
                }
                this.loadCart();
            });
        } else {
            this.loadCart();
        }
        this.toastr.success('Successfully added to cart');
    }

    loadCart(): void {
        this.totalCost = 0;
        this.items = [];
        let cart = JSON.parse(localStorage.getItem('cart'));
        for (var i = 0; i < cart.length; i++) {
            let item = JSON.parse(cart[i]);
            this.items.push({
                movie: item.movie,
                quantity: item.quantity
            });
            this.totalCost += item.movie.price * item.quantity;
        }
    }

    remove(id: number): void {
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
            let item: Item = JSON.parse(cart[i]);
            if (item.movie.id == id) {
                cart.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.loadCart();
        this.toastr.success('Successfully removed from cart');
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}

export class Item {
    movie: Movie;
    quantity: number;
}
