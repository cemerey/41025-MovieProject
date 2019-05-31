package com.cem.movieapp.repository.search;

import com.cem.movieapp.domain.OrderHistory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the OrderHistory entity.
 */
public interface OrderHistorySearchRepository extends ElasticsearchRepository<OrderHistory, Long> {
}
