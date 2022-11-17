package com.ssafyebs.customerback.domain.pay.service;

import java.io.IOException;
import java.util.List;

import com.ssafyebs.customerback.domain.pay.entity.Pay;

public interface PayService {
	Pay save(Pay p);
	List<Pay> getNewerList();
	Boolean deletePay(Long seq, String uid) throws IOException;
}
