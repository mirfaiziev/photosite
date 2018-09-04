<?php

namespace App\Controller;

use App\Service\ImageService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PortfolioController extends AbstractController
{
    /**
     * @Route("/portfolio", name="portfolioIndex")
     */
    public function index()
    {
        return $this->render('portfolio/index.html.twig', [
            'controller_name' => 'PortfolioController',
        ]);
    }

    /**
     * @Route("/portfolio/{slug}", name="portfolioShow")
     * @param string $slug
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function show($slug)
    {
        if (!isset(ImageService::IMAGES[$slug])) {
            return $this->redirectToRoute('portfolioIndex');
        }

        return $this->render('portfolio/show.html.twig', [
            'images' => ImageService::IMAGES[$slug],
        ]);
    }
}
