package com.rs.planner.link;

import com.rs.planner.trip.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LinkService {

    @Autowired
    private LinkRepository linkRepository;

    public LinkResponse registerLink(LinkRequestPayload payload, Trip trip) {
        Link newLink = new Link(payload.title(), payload.url(), trip);

        this.linkRepository.save(newLink);

        return new LinkResponse(newLink.getId());
    }

//    public List<LinkResponse> getAllLinksFromId(UUID tripId) {
//        return this.linkRepository.findByTripId(tripId).stream().map(activity ->
//                new LinkResponse(
//                        activity.getId(),
//                        activity.getTitle(),
//                        activity.getOccursAt())).toList();
//    }
}
