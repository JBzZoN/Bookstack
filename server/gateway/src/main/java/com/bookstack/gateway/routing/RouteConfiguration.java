package com.bookstack.gateway.routing;
import java.net.URI;
import org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class RouteConfiguration {

	@Bean
	public RouterFunction<ServerResponse> loginServerRoute() {

	    return GatewayRouterFunctions.route("login-route")
	        .route(
	            RequestPredicates.path("/auth/**"),
	            HandlerFunctions.http()
	        )
	        .before(
	            BeforeFilterFunctions.uri("http://localhost:9090")
	        )
	        .build();
	}
	
	@Bean
	public RouterFunction<ServerResponse> bookstackServerRoute() {

	    return GatewayRouterFunctions.route("login-route")
	        .route(
	            RequestPredicates.path("/staff/**"),
	            HandlerFunctions.http()
	        )
	        .route(
		            RequestPredicates.path("/admin/**"),
		            HandlerFunctions.http()
		    )
	        .route(
		            RequestPredicates.path("/member/**"),
		            HandlerFunctions.http()
		    )
	        .before(
	            BeforeFilterFunctions.uri("http://localhost:8080")
	        )
	        .build();
	}

}