package com.cem.movieapp.web.rest;
import com.cem.movieapp.domain.OrderHistory;
import com.cem.movieapp.repository.MovieRepository;
import com.cem.movieapp.repository.OrderHistoryRepository;
import com.cem.movieapp.repository.search.OrderHistorySearchRepository;
import com.cem.movieapp.web.rest.errors.BadRequestAlertException;
import com.cem.movieapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing OrderHistory.
 */
@RestController
@RequestMapping("/api")
public class OrderHistoryResource {

    private final Logger log = LoggerFactory.getLogger(OrderHistoryResource.class);

    private static final String ENTITY_NAME = "orderHistory";

    private final OrderHistoryRepository orderHistoryRepository;

    private final OrderHistorySearchRepository orderHistorySearchRepository;

    private final MovieRepository movieRepository;

    public OrderHistoryResource(OrderHistoryRepository orderHistoryRepository, OrderHistorySearchRepository orderHistorySearchRepository,  MovieRepository movieRepository) {
        this.orderHistoryRepository = orderHistoryRepository;
        this.orderHistorySearchRepository = orderHistorySearchRepository;
        this.movieRepository = movieRepository;
    }

    /**
     * POST  /order-histories : Create a new orderHistory.
     *
     * @param orderHistory the orderHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderHistory, or with status 400 (Bad Request) if the orderHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-histories")
    public ResponseEntity<OrderHistory> createOrderHistory(@RequestBody OrderHistory orderHistory) throws URISyntaxException {
        log.debug("REST request to save OrderHistory : {}", orderHistory);
        if (orderHistory.getId() != null) {
            throw new BadRequestAlertException("A new orderHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }

        String movieTitle = orderHistory.getMovieTitle();
        OrderHistory result = orderHistoryRepository.save(orderHistory);
        orderHistorySearchRepository.save(result);

        return ResponseEntity.created(new URI("/api/order-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-histories : Updates an existing orderHistory.
     *
     * @param orderHistory the orderHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderHistory,
     * or with status 400 (Bad Request) if the orderHistory is not valid,
     * or with status 500 (Internal Server Error) if the orderHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-histories")
    public ResponseEntity<OrderHistory> updateOrderHistory(@RequestBody OrderHistory orderHistory) throws URISyntaxException {
        log.debug("REST request to update OrderHistory : {}", orderHistory);
        if (orderHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderHistory result = orderHistoryRepository.save(orderHistory);
        orderHistorySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-histories : get all the orderHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderHistories in body
     */
    @GetMapping("/order-histories")
    public List<OrderHistory> getAllOrderHistories() {
        log.debug("REST request to get all OrderHistories");
        return orderHistoryRepository.findAll();
    }

    /**
     * GET  /order-histories/:id : get the "id" orderHistory.
     *
     * @param id the id of the orderHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderHistory, or with status 404 (Not Found)
     */
    @GetMapping("/order-histories/{id}")
    public ResponseEntity<OrderHistory> getOrderHistory(@PathVariable Long id) {
        log.debug("REST request to get OrderHistory : {}", id);
        Optional<OrderHistory> orderHistory = orderHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderHistory);
    }

    /**
     * DELETE  /order-histories/:id : delete the "id" orderHistory.
     *
     * @param id the id of the orderHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-histories/{id}")
    public ResponseEntity<Void> deleteOrderHistory(@PathVariable Long id) {
        log.debug("REST request to delete OrderHistory : {}", id);
        orderHistoryRepository.deleteById(id);
        orderHistorySearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/order-histories?query=:query : search for the orderHistory corresponding
     * to the query.
     *
     * @param query the query of the orderHistory search
     * @return the result of the search
     */
    @GetMapping("/_search/order-histories")
    public List<OrderHistory> searchOrderHistories(@RequestParam String query) {
        log.debug("REST request to search OrderHistories for query {}", query);
        return StreamSupport
            .stream(orderHistorySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
