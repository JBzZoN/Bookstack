package com.bookstack.auth.config;

import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;

/**
 * IP Checking Utility
 * =========================================================================
 * Helper component used to extract the true client IP address from incoming
 * HTTP requests. Handles common proxy and load balancer headers.
 */
@Component
public class IpChecking {

	/**
	 * Determines the client's IP address.
	 * Prioritizes proxy headers (X-Forwarded-For, etc.) over direct remote address
	 * to ensure accuracy when behind a gateway or load balancer.
	 * 
	 * @param request The incoming HttpServletRequest.
	 * @return The resolved client IP string.
	 */
	public static String getClientIp(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");

		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP"); // WebLogic
		}
		if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr(); // Fallback
		}

		// If multiple IPs are present in the header, take the first one (origin)
		if (ip != null && ip.contains(",")) {
			ip = ip.split(",")[0].trim();
		}
		return ip;
	}
}
