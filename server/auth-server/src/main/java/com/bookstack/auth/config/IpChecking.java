package com.bookstack.auth.config;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class IpChecking {

	public static String getClientIp(HttpServletRequest request) {
	    String ip = request.getHeader("X-Forwarded-For"); // check proxy headers
	    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("Proxy-Client-IP");
	    }
	    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("WL-Proxy-Client-IP"); // WebLogic
	    }
	    if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getRemoteAddr(); // fallback
	    }
	    // If multiple IPs, take the first one
	    if (ip != null && ip.contains(",")) {
	        ip = ip.split(",")[0].trim();
	    }
	    return ip;
	}
}
