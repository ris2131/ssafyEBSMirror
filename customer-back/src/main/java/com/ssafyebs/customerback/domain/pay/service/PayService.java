package com.ssafyebs.customerback.domain.pay.service;

import java.util.List;

import com.ssafyebs.customerback.domain.pay.entity.Pay;

public interface PayService {
	Pay save(Pay p);
	List<Pay> getNewerList();
}
