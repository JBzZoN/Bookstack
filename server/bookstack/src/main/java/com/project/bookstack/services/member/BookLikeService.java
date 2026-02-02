package com.project.bookstack.services.member;

import java.util.List;

public interface BookLikeService {

	public List<Integer> getLikedBooks(Integer userId);
	
    public boolean toggleLike(Integer userId, Integer bookId);

}
