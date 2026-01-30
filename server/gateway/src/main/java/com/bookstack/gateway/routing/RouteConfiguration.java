package com.bookstack.gateway.routing;
import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import com.bookstack.gateway.security.JwtUtil;

@Configuration
public class RouteConfiguration {

	@Autowired
	JwtUtil jwtUtil;
	
	@Bean
	public RouterFunction<ServerResponse> loginServerRoute() {

	    return GatewayRouterFunctions.route("login-route")
	        .route(
	            RequestPredicates.path("/auth/**"),
	            HandlerFunctions.http()
	        )
	        .before((request) -> {

	            String authHeader = request.headers().firstHeader("Authorization");

	            if (authHeader != null && authHeader.startsWith("Bearer ")) {

	                String token = authHeader.substring(7);

	                // ✅ validate JWT
	                String userId = jwtUtil.validateAndGetUserId(token);

	                // ✅ add header for downstream service
	                return ServerRequest.from(request)
	                        .header("X-User-Id", userId)
	                        .build();
	            }

	            return request;
	        })
	        .before(
	            BeforeFilterFunctions.uri("http://localhost:9090")
	        )
	        .build();
	}
	
	@Bean
	public RouterFunction<ServerResponse> bookExpressRoute() {

	    return GatewayRouterFunctions.route("book-route")
	        .route(
	            RequestPredicates.path("/book/**"),
	            HandlerFunctions.http()
	        )
	        .before((request) -> {

	            String authHeader = request.headers().firstHeader("Authorization");

	            if (authHeader != null && authHeader.startsWith("Bearer ")) {

	                String token = authHeader.substring(7);

	                // ✅ validate JWT
	                String userId = jwtUtil.validateAndGetUserId(token);

	                // ✅ add header for downstream service
	                return ServerRequest.from(request)
	                        .header("X-User-Id", userId)
	                        .build();
	            }

	            return request;
	        })
	        .before(
	            BeforeFilterFunctions.uri("http://localhost:4000")
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
	        .before((request) -> {

	            String authHeader = request.headers().firstHeader("Authorization");

	            if (authHeader != null && authHeader.startsWith("Bearer ")) {

	                String token = authHeader.substring(7);

	                // ✅ validate JWT
	                String userId = jwtUtil.validateAndGetUserId(token);

	                // ✅ add header for downstream service
	                return ServerRequest.from(request)
	                        .header("X-User-Id", userId)
	                        .build();
	            }

	            return request;
	        })
	        .before(
	            BeforeFilterFunctions.uri("http://localhost:8080")
	        )
	        .build();
	}

}