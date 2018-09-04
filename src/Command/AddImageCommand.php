<?php

namespace App\Command;

use App\Repository\ImageRepository;
use App\Service\ImageService;
use Psr\Container\ContainerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\Container;

class AddImageCommand extends Command
{
    protected static $defaultName = 'app:add-image';

    /** @var string */
    protected $imagesDir;

    /** @var array */
    protected $imageSizes;

    /** @var ImageService */
    protected $imageService;

    /**
     * AddImageCommand constructor.
     *
     * @param ContainerInterface $container
     * @param ImageService       $imageService
     */
    public function __construct(ContainerInterface $container, ImageService $imageService)
    {
        // todo : refactor
        $this->imagesDir = $container->getParameter('kernel.project_dir') . '/public_html' .
            $container->getParameter('images_paths.gallery_images');

        $this->imageSizes = $container->getParameter('image_sizes');
        $this->imageService = $imageService;

        parent::__construct();
    }


    protected function configure()
    {
        $this
            ->setDescription('Add new image to the project, now support only square')
            ->addOption(
                'path',
                'p',
                InputOption::VALUE_REQUIRED,
                'Path to the image to add'
            )
            ->addOption(
                'imageName',
                'i',
                InputOption::VALUE_REQUIRED,
                'Name to add to the system'
            )
            ->addOption(
                'gallery',
                'g',
                InputOption::VALUE_REQUIRED,
                'Gallery slug'
            )
            ->addUsage('app:add-image --path=path to the file --imageName=name in the system');
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);
        $filePath = $input->getOption('path');
        $fileName = $input->getOption('imageName');
        $galleryName = $input->getOption('gallery');

        if ($filePath && is_file($filePath) && getimagesize($filePath)) {
            $source = imagecreatefromjpeg(realpath($filePath));
            list($width, $height) = getimagesize($filePath);

            $fileExtension = pathinfo(parse_url($fileName)['path'], PATHINFO_EXTENSION);
            if (empty($fileExtension)) {
                $fileName .= '.jpg';
            }

            foreach ($this->imageSizes as $slug => $imageSize) {
                $destinationPath = $this->transformImage($slug, $fileName, $imageSize, $source, $width, $height);
                $io->write(sprintf("%s added", $destinationPath), true);
            }

           // $this->imageService->addImageToGallery($fileName, $galleryName);
        } else {
            $io->error('cannot read image file');
        }

    }

    /**
     * @param $slug
     * @param $fileName
     * @param $imageSize
     * @param $source
     * @param $width
     * @param $height
     *
     * @return string
     */
    protected function transformImage($slug, $fileName, $imageSize, $source, $width, $height): string
    {
        $destinationPath = $this->imagesDir . $slug . DIRECTORY_SEPARATOR;
        if (!is_dir($destinationPath)) {
            mkdir($destinationPath, 644, true);
        }

        $destinationFile = $destinationPath . $fileName;

        $destination = imagecreatetruecolor($imageSize, $imageSize);
        imagecopyresampled($destination, $source, 0, 0, 0, 0, $imageSize, $imageSize, $width, $height);
        imagejpeg($destination, $destinationFile, 100);

        return $destinationPath;
    }
}
